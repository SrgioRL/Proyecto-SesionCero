import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la vista de inicio.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  /**
   * Constructor
   *
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private router: Router) {}

  /**
   * Navega a la página de inicio de sesión.
   *
   * Este método redirige al usuario a la página de inicio de sesión.
   */
  login() {
    this.router.navigate(['/login']);
  }

  /**
   * Navega a la página de recursos.
   *
   * Este método redirige al usuario a la página de recursos.
   */
  goRecursos() {
    this.router.navigate(['/recursos']);
  }

  /**
   * Navega a la página de error.
   *
   * Este método redirige al usuario a la página de error.
   */
  error() {
    this.router.navigate(['/error']);
  }
}
