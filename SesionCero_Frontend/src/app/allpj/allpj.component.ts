import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/personaje.interface';
import { PersonajeService } from '../services/personaje.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Este es el componente que se encarga de manejar la vista de todos los personajes.
 * 
 */
@Component({
  selector: 'app-allpj',
  templateUrl: './allpj.component.html',
  styleUrls: ['./allpj.component.css'] 
})
export class AllpjComponent implements OnInit {
  
  /**
   * Almacena el ID del jugador actual. Puede ser un número o null.
   */
  public idJugador: number | null = null; 
  
  /**
   * Lista de personajes que se mostrarán en la vista.
   */
  public personajes: Personaje[] = [];

  /**
   * Constructor
   * 
   * @param {ActivatedRoute} route - Para obtener información sobre la ruta activa.
   * @param {PersonajeService} personajeService - Servicio para manejar los datos de los personajes.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService,
    private router: Router,
  ) {}

  /**
   * Método que se ejecuta al iniciar el componente.
   * 
   * En este caso, procesamos los parámetros de la ruta para obtener el ID del jugador.
   * Dependiendo de si hay un ID de jugador o no, obtenemos los personajes correspondientes.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idJugador = +params['idJugador'] || null;
      if (this.idJugador) {
        this.obtenerPersonajes();
      } else {
        this.obtenerTodosLosPersonajes();
      }
    });
  }

  /**
   * Obtiene los personajes de un jugador específico usando su ID.
   * 
   * Llama al servicio `PersonajeService` y procesa el resultado para manejar los datos.
   */
  obtenerPersonajes(): void {
    this.personajeService.obtenerPersonajesPorIdJugador(this.idJugador!).subscribe(
      data => {
        this.personajes = data;
      },
      error => {
        console.error('Error al obtener personajes', error);
      }
    );
  }

  /**
   * Obtiene todos los personajes sin filtrar por ningún jugador específico.
   * 
   * Llama al servicio `PersonajeService` y procesa el resultado para manejar los datos.
   */
  obtenerTodosLosPersonajes(): void {
    this.personajeService.buscarPersonajes().subscribe(
      data => {
        this.personajes = data;
      },
      error => {
        console.error('Error al obtener todos los personajes', error);
      }
    );
  }

  /**
   * Navega a la vista de detalle de un personaje específico.
   * 
   * @param {number} idPersonaje - El ID del personaje cuyo detalle queremos ver.
   */
  verDetalle(idPersonaje: number): void {
    this.router.navigate(['/personaje', idPersonaje]);
  }

  /**
   * Elimina un personaje específico y actualiza la lista de personajes.
   * 
   * @param {number} idPersonaje - El ID del personaje que queremos eliminar.
   */
  eliminarPersonaje(idPersonaje: number): void {
    this.personajeService.eliminarPersonaje(idPersonaje).subscribe(
      () => {
        console.log('Personaje eliminado correctamente.');
        this.idJugador ? this.obtenerPersonajes() : this.obtenerTodosLosPersonajes(); 
      },
      (error) => {
        console.error('Error al eliminar personaje:', error);
      }
    );
  }

  /**
   * Navega a la vista para crear un nuevo personaje.
   */
  crearPersonaje() {
    this.router.navigate(['/crear']);
  }
}
