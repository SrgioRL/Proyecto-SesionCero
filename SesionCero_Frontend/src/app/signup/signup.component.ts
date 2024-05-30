import { Component } from '@angular/core';
import { JugadorService } from '../services/jugador.service';
import { Jugador } from '../interfaces/jugador.interface';
import { Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la vista de registro de nuevos jugadores.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  /**
   * Objeto que representa un nuevo jugador.
   */
  nuevoJugador: Jugador = {
    idJugador: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: '',
  };

  /**
   * El constructor del componente. Aquí se inyectan las dependencias necesarias.
   *
   * @param {JugadorService} jugadorService - Servicio para manejar los datos de los jugadores.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private jugadorService: JugadorService, private router: Router) {}

  /**
   * Método para agregar un nuevo jugador.
   *
   * Utiliza el servicio de jugadores para registrar un nuevo jugador.
   * Si el registro es correcto, redirige al usuario a la vista de inicio de sesión.
   * Si ocurre un error, muestra un mensaje de error en la consola.
   */
  agregarJugador() {
    this.jugadorService.altaJugador(this.nuevoJugador).subscribe(
      (jugador) => {
        console.log('Jugador creado:', jugador);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al crear jugador:', error);
      }
    );
  }

    /**
   * Navega a la página de inicio.
   *
   * Este método redirige al usuario a la página de inicio.
   */
    goHome() {
      this.router.navigate(['/']);
    }
}
