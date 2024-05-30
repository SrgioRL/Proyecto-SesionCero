import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Este es el componente encargado de manejar la barra de navegación.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  public isMenuOpen: boolean = false;

  /**
   * El constructor del componente. Aquí se inyectan las dependencias necesarias.
   *
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   */
  constructor(private authService: AuthService) {}

  /**
   * Alterna el estado del menú de navegación.
   *
   * Cambia el estado de `isMenuOpen` entre true y false para mostrar u ocultar el menú.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Maneja el cierre de sesión.
   *
   * Utiliza el servicio de autenticación para cerrar la sesión del usuario.
   */
  logout() {
    this.authService.logout();
  }
}
