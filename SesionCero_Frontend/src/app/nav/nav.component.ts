import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la barra de navegación.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public isMenuOpen: boolean = false;
  public isDropdownOpen: boolean = false;
  public nombreUsuario: string | null = null;
  public idJugador: number | null = null;

  /**
   * El constructor del componente. Aquí se inyectan las dependencias necesarias.
   *
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   */
  constructor(private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Método que se ejecuta al iniciar el componente.
   *
   * Verifica si el almacenamiento local está disponible y, si es así, obtiene el nombre de usuario y el ID del jugador.
   */
  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      this.nombreUsuario = localStorage.getItem('nombreUsuario'); 
      const idJugadorString = localStorage.getItem('idJugador');
      this.idJugador = idJugadorString ? parseInt(idJugadorString, 10) : null;
    }
  }
  
  /**
   * Alterna el estado del menú de navegación.
   *
   * Cambia el estado de `isMenuOpen` entre true y false para mostrar u ocultar el menú.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Alterna el estado del menú desplegable.
   *
   * @param {boolean} isOpen - El estado del menú desplegable.
   */
  toggleDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }

  /**
   * Maneja el proceso de cierre de sesión.
   *
   * Utiliza el servicio de autenticación para cerrar la sesión del usuario.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/logout']).then(() => {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000); 
    });
  }


  /**
   * Verifica si el usuario está autenticado.
   *
   * @returns {boolean} - `true` si el usuario está autenticado, `false` en caso contrario.
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Verifica si el almacenamiento local está disponible.
   *
   * Intenta utilizar el almacenamiento local para ver si está disponible.
   *
   * @returns {boolean} - `true` si el almacenamiento local está disponible, `false` en caso contrario.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
