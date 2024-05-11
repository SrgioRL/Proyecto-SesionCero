import { Component } from '@angular/core';
import { Jugador } from '../interfaces/jugador.interface';
import { JugadorService } from '../services/jugador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {

  jugadorActual: Jugador = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: ''
  };

  jugadores: Jugador[] = [];

  constructor(private jugadorService: JugadorService) { }

  agregarJugador() {
    this.jugadorService.altaJugador(this.jugadorActual).subscribe(
      jugador => {
        console.log("Jugador agregado:", jugador);
        // Actualizar lista de jugadores después de agregar uno nuevo
        this.buscarJugadores();
      },
      error => {
        console.error('Error al agregar jugador:', error);
      }
    );
  }

  eliminarJugador(idJugador: number) {
    this.jugadorService.eliminarJugador(idJugador).subscribe(
      response => {
        console.log(response);
        // Actualizar lista de jugadores después de eliminar uno
        this.buscarJugadores();
      },
      error => {
        console.error('Error al eliminar jugador:', error);
      }
    );
  }

  obtenerJugador(idJugador: number) {
    this.jugadorService.mostrarJugador(idJugador).subscribe(
      jugador => {
        console.log("Jugador obtenido:", jugador);
        // Asignar el jugador obtenido al jugador actual
        this.jugadorActual = jugador;
      },
      error => {
        console.error('Error al obtener jugador:', error);
      }
    );
  }

  modificarJugador() {
    this.jugadorService.modificarJugador(this.jugadorActual).subscribe(
      jugador => {
        console.log("Jugador modificado:", jugador);
        // Actualizar lista de jugadores después de modificar uno
        this.buscarJugadores();
      },
      error => {
        console.error('Error al modificar jugador:', error);
      }
    );
  }

  buscarJugadores() {
    this.jugadorService.buscarJugadores().subscribe(
      jugadores => {
        console.log("Jugadores encontrados:", jugadores);
        this.jugadores = jugadores;
      },
      error => {
        console.error('Error al buscar jugadores:', error);
      }
    );
  }
}
