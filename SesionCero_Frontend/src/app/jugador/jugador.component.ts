import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/jugador.interface';
import { JugadorService } from '../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la vista del jugador.
 */
@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css'],
})
export class JugadorComponent implements OnInit {
  jugadorActual!: Jugador;
  jugadores: Jugador[] = [];
  modificacionExitosa: boolean = false;
  borradoExitoso: boolean = false;
  errorEliminarJugador: boolean = false;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} route - Para obtener información sobre la ruta activa.
   * @param {JugadorService} jugadorService - Servicio para manejar los datos de los jugadores.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(
    private route: ActivatedRoute,
    private jugadorService: JugadorService,
    private router: Router
  ) {}

  /**
   * Método que se ejecuta al iniciar el componente.
   *
   * Suscribe a los parámetros de la ruta para obtener el ID del jugador y luego obtiene los datos del jugador.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idJugador = +params.get('idJugador')!;
      if (idJugador) {
        this.obtenerJugador(idJugador);
      }
    });
  }

  /**
   * Agrega un nuevo jugador.
   *
   * Si hay un jugador actual, utiliza el servicio de jugadores para agregarlo y luego busca todos los jugadores.
   */
  agregarJugador() {
    if (this.jugadorActual) {
      this.jugadorService.altaJugador(this.jugadorActual).subscribe(
        (jugador) => {
          console.log('Jugador agregado:', jugador);
          this.buscarJugadores();
        },
        (error) => {
          console.error('Error al crear jugador:', error);
        }
      );
    }
    // TODO: redireccionar a /personajes para mostrar la página en vacío
  }

  /**
   * Elimina un jugador por su ID.
   *
   * Utiliza el servicio de jugadores para eliminar al jugador, actualiza la lista de jugadores.
   *
   * @param {number} idJugador - El ID del jugador a eliminar.
   */
  eliminarJugador(idJugador: number) {
    this.jugadorService.eliminarJugador(idJugador).subscribe(
      (response) => {
        console.log(response);
        this.buscarJugadores();
        this.borradoExitoso = true;
        setTimeout(() => {
          this.router.navigate(['/']);
          // TODO: mirar por qué se visualiza mal el login con la redirección
        }, 3000);
      },
      (error) => {
        console.error('Error al eliminar jugador:', error);
        this.errorEliminarJugador = true; // TODO: da error pero elimina bien en la BBDD
      }
    );
  }

  /**
   * Obtiene los datos de un jugador por su ID.
   *
   * Utiliza el servicio de jugadores para obtener los datos del jugador.
   *
   * @param {number} idJugador - El ID del jugador a obtener.
   */
  obtenerJugador(idJugador: number) {
    this.jugadorService.mostrarJugador(idJugador).subscribe(
      (jugador) => {
        console.log('Jugador obtenido:', jugador);
        this.jugadorActual = jugador;
      },
      (error) => {
        console.error('Error al obtener jugador:', error);
      }
    );
  }

  /**
   * Modifica los datos del jugador actual.
   *
   * Si hay un jugador actual, utiliza el servicio de jugadores para modificarlo y luego busca todos los jugadores.
   */
  modificarJugador() {
    if (this.jugadorActual) {
      this.jugadorService.modificarJugador(this.jugadorActual).subscribe(
        (jugador) => {
          console.log('Jugador modificado:', jugador);
          this.buscarJugadores();
        },
        (error) => {
          console.error('Error al modificar jugador:', error);
        }
      );
    }
    this.modificacionExitosa = true;
  }

  /**
   * Busca todos los jugadores.
   *
   * Utiliza el servicio de jugadores para obtener la lista de todos los jugadores.
   */
  buscarJugadores() {
    this.jugadorService.buscarJugadores().subscribe(
      (jugadores) => {
        console.log('Jugadores encontrados:', jugadores);
        this.jugadores = jugadores;
      },
      (error) => {
        console.error('Error al buscar jugadores:', error);
      }
    );
  }
}
