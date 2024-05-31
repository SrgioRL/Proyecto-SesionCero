import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la vista de error.
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  /**
   * Constructor
   *
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private router: Router) {}

  /**
   * Navega a la página de inicio.
   *
   * Este método redirige al usuario a la página de inicio.
   */
  goHome() {
    this.router.navigate(['/']);
  }
}
