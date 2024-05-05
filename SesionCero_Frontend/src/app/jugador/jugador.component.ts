import { Component } from '@angular/core';
import { Jugador } from '../interfaces/jugador.interface';
import { JugadorService } from '../services/jugador.service';


@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {

  // Variable para almacenar el jugador actual
  public jugadorActual: Jugador = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    contraseña: ''
  };

  // Variable para almacenar la lista de jugadores
  jugadores: Jugador[] = [];

  constructor(private jugadorService: JugadorService) { }

  // Método para agregar un nuevo jugador
  agregarJugador() {
    this.jugadorService.altaJugador(this.jugadorActual).subscribe(jugador => {
      console.log("Jugador agregado:", jugador);
    });
  }

  // Método para eliminar un jugador por su ID
  eliminarJugador(idJugador: number) {
    this.jugadorService.eliminarJugador(idJugador).subscribe(response => {
      console.log(response);
    });
  }

  // Método para obtener un jugador por su ID
  obtenerJugador(idJugador: number) {
    this.jugadorService.mostrarJugador(idJugador).subscribe(jugador => {
      console.log("Jugador obtenido:", jugador);
    });
  }

  // Método para modificar un jugador
  modificarJugador() {
    this.jugadorService.modificarJugador(this.jugadorActual).subscribe(jugador => {
      console.log("Jugador modificado:", jugador);
    });
  }

  // Método para buscar todos los jugadores
  buscarJugadores() {
    this.jugadorService.buscarJugadores().subscribe(jugadores => {
      console.log("Jugadores encontrados:", jugadores);
      this.jugadores = jugadores;
    });
  }
}
