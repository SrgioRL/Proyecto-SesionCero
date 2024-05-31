import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';
import { HabilidadService } from '../services/habilidad.service';
import {
  habilidadesPorClase,
  todasLasHabilidades,
} from '../dataConstants/habilidadesPorClase';

/**
 * Este es el componente encargado de manejar la vista de detalles de un personaje.
 */
@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css'],
})
export class PersonajeComponent implements OnInit {
  public personaje!: Personaje;
  public idPersonaje!: number;
  public retratoUrl: string | undefined;
  public habilidadesFijas: string[] = [];
  public habilidadesAdicionales: string[] = [];
  public habilidadesDisponibles: string[] = todasLasHabilidades;
  public habilidadesFijasSeleccionadas: string[] = [];

  /**
   * Constructor
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
   * También obteniene las habilidades fijas y adicionales.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idPersonaje = +params['idPersonaje'];
      if (this.idPersonaje) {
        this.personajeService.mostrarPersonaje(this.idPersonaje).subscribe(
          (data: Personaje) => {
            this.personaje = data;
            this.retratoUrl = this.personaje.retrato
              ? `data:image/jpeg;base64,${this.personaje.retrato}`
              : undefined;
            this.setHabilidades(this.personaje.clase.nombre);
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
      this.habilidadesFijas = habilidades.fijas;
      this.habilidadesFijasSeleccionadas = habilidades.adicionales;
    });
  }

  /**
   * Establece las habilidades del personaje según su clase.
   *
   * Este método configura las habilidades fijas y adicionales del personaje
   * basado en su clase, y las actualiza en el servicio `HabilidadService`.
   *
   * @param {string} clase - La clase del personaje.
   */
  setHabilidades(clase: string): void {
    if (clase) {
      const habilidades = {
        fijas: habilidadesPorClase[clase] || [],
        adicionales: todasLasHabilidades,
      };
      this.habilidadService.setHabilidadesPorPersonaje(habilidades);
    } else {
      console.error('La clase del personaje no está definida');
    }
  }

  /**
   * Navega a la página para crear un nuevo personaje.
   *
   * Este método redirige al usuario a la página de creación de personajes.
   */
  crearPersonaje(): void {
    this.router.navigate(['/crear']);
  }

  /**
   * Calcula el modificador de una característica según su valor.
   *
   * Este método toma el valor de una característica (como fuerza o destreza)
   * y calcula su modificador.
   *
   * @param {number} valor - El valor de la característica.
   * @returns {number} - El modificador calculado.
   */
  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }

  /**
   * Elimina un personaje por su ID.
   *
   * Este método elimina el personaje con el ID proporcionado.
   * Si la eliminación es exitosa, obtiene el ID del jugador logueado desde el almacenamiento local.
   * Luego redirige al usuario a la lista de personajes del jugador.
   * Si no se puede obtener el ID del jugador desde el almacenamiento local, muestra un mensaje de error.
   * En caso de error al eliminar el personaje, se muestra un mensaje de error en la consola.
   *
   * @param {number} idPersonaje - El ID del personaje a eliminar.
   */
  eliminarPersonaje(idPersonaje: number) {
    this.personajeService.eliminarPersonaje(idPersonaje).subscribe(
      (response) => {
        console.log('Personaje eliminado con éxito', response);
        const idJugador = localStorage.getItem('idJugador');
        console.log('ID del jugador obtenido:', idJugador);
        if (idJugador) {
          this.router.navigate(['/todos', idJugador]);
        } else {
          console.error('No se pudo obtener el ID del jugador logueado');
        }
      },
      (error) => {
        console.error('Error eliminando personaje', error);
      }// TODO: da error pero elimina bien en la BBDD
    );
  }
}
