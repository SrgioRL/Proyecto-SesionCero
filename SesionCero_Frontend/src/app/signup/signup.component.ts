import { Component } from '@angular/core';
import { JugadorService } from '../services/jugador.service';
import { Jugador } from '../interfaces/jugador.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corregido de styleUrl a styleUrls
})
export class SignupComponent {

  // Declaración de la variable jugadorActual
  nuevoJugador: Jugador = {
    idJugador: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: ''
  };

  // Inyección del servicio en el constructor
  constructor(private jugadorService: JugadorService) { }

  // Método para agregar un nuevo jugador
  agregarJugador() {
    this.jugadorService.altaJugador(this.nuevoJugador).subscribe(
      jugador => {
        console.log("Jugador agregado:", jugador);
        // No hay necesidad de actualizar la lista de jugadores en este componente
      },
      error => {
        console.error('Error al agregar jugador:', error);
      }
    );
  }

}
