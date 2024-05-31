import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Servicio para proteger rutas.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   *
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método para determinar si una ruta puede ser activada.
   *
   * Este método verifica si el usuario está autenticado antes de permitir el acceso a la ruta.
   * Si el usuario no está autenticado, redirige a la página de inicio de sesión.
   *
   * @param {ActivatedRouteSnapshot} next - La siguiente ruta que se va a activar.
   * @param {RouterStateSnapshot} state - El estado del router.
   * @returns {boolean} - `true` si el usuario está autenticado y puede activar la ruta, `false` en caso contrario.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
