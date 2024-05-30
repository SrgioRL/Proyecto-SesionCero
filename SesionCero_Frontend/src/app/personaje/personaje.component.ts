import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';
import { HabilidadService } from '../services/habilidad.service';
import { habilidadesPorClase, todasLasHabilidades } from '../dataConstants/habilidadesPorClase';

/**
 * Este es el componente encargado de manejar la vista de detalles de un personaje.
 */
@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css'],
})
export class PersonajeComponent implements OnInit {
  public personajes: Personaje[] = [];
  public personaje: Personaje | undefined;
  public idPersonaje: number | undefined;
  public retratoUrl: any;
  public habilidadesFijas: string[] = [];
  public habilidadesAdicionales: string[] = [];
  public habilidadesDisponibles: string[] = todasLasHabilidades; // Lista de habilidades disponibles
  public habilidadesFijasSeleccionadas: string[] = []; 

  /**
   * El constructor del componente. Aquí se inyectan las dependencias necesarias.
   *
   * @param {ActivatedRoute} route - Para obtener información sobre la ruta activa.
   * @param {PersonajeService} personajeService - Servicio para manejar los datos de los personajes.
   * @param {Router} router - Para navegar entre diferentes vistas.
   * @param {HabilidadService} habilidadService - Servicio para manejar las habilidades de los personajes.
   */
  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService,
    private router: Router,
    private habilidadService: HabilidadService
  ) {}

  /**
   * Método que se ejecuta al iniciar el componente.
   *
   * Suscribe a los parámetros de la ruta para obtener el ID del personaje y luego obtiene los detalles del personaje.
   * También suscribe a las habilidades del personaje para obtener las habilidades fijas y adicionales.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idPersonaje = +params['idPersonaje'];
      if (this.idPersonaje) {
        this.personajeService.mostrarPersonaje(this.idPersonaje).subscribe(
          (data: Personaje) => {
            this.personaje = data;
            this.setHabilidades(this.personaje.clase.nombre); // Usar la clase del personaje
          },
          (error) => {
            console.error(
              'Error al obtener los detalles del personaje:',
              error
            );
          }
        );
      }
    });

    this.habilidadService.habilidadesPorPersonaje$.subscribe((habilidades) => {
      console.log('Habilidades recibidas:', habilidades);
      this.habilidadesFijas = habilidades.fijas;
      this.habilidadesFijasSeleccionadas = habilidades.adicionales;
    });
  }

 /**
   * Configura las habilidades del personaje según su clase.
   *
   * @param {string} clase - La clase del personaje.
   */
 setHabilidades(clase: string): void {
  if (clase) {
    const habilidades = {
      fijas: habilidadesPorClase[clase] || [],
      adicionales: todasLasHabilidades
    };
    console.log(`Habilidades para la clase ${clase}:`, habilidades);
    this.habilidadService.setHabilidadesPorPersonaje(habilidades);
  } else {
    console.error('La clase del personaje no está definida');
  }
}


  /**
   * Obtiene el retrato del personaje.
   *
   * Si hay un ID de personaje, utiliza el servicio de personajes para obtener el retrato del personaje
   * y lo convierte a un formato base64 para mostrarlo.
   */
  obtenerRetrato() {
    console.log('Retrato', this.retratoUrl);
    if (this.idPersonaje) {
      this.personajeService.obtenerRetrato(this.idPersonaje).subscribe(
        (data: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.retratoUrl = reader.result as string;
          };
          reader.readAsDataURL(data);
        },
        (error) => {
          console.error('Error al obtener el retrato del personaje:', error);
        }
      );
    }
  }

  /**
   * Navega a la vista para crear un nuevo personaje.
   */
  crearPersonaje() {
    this.router.navigate(['/crear']);
  }

  /**
   * Calcula el modificador de una característica según su valor.
   *
   * @param {number} valor - El valor de la característica.
   * @returns {number} - El modificador calculado.
   */
  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }
}
