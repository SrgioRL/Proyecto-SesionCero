import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Servicio para manejar la autenticación de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8087/jugador';

  /**
   * Constructor
   *
   * @param {HttpClient} http - Para realizar solicitudes HTTP.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private http: HttpClient, private router: Router) {}

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

  /**
   * Maneja el proceso de inicio de sesión.
   *
   * Envía las credenciales de inicio de sesión al servidor y guarda el token JWT, nombre de usuario y ID del jugador en el almacenamiento local.
   *
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Observable<{ token: string; idJugador: number; nombre: string }>} - Un observable que emite la respuesta del servidor.
   */
  login(
    email: string,
    password: string
  ): Observable<{ token: string; idJugador: number; nombre: string }> {
    return this.http
      .post<{ token: string; idJugador: number; nombre: string }>(
        `${this.baseUrl}/login`,
        {
          username: email,
          password,
        }
      )
      .pipe(
        tap((response) => {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('nombreUsuario', response.nombre);
            localStorage.setItem('idJugador', response.idJugador.toString());
          }
        })
      );
  }

  /**
   * Maneja el proceso de cierre de sesión.
   *
   * Elimina el token JWT, nombre de usuario y ID del jugador del almacenamiento local y redirige al usuario a la página de inicio.
   */
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('idJugador');
    }
    this.router.navigate(['/']);
  }

  /**
   * Obtiene el token JWT almacenado.
   *
   * @returns {string | null} - El token JWT si está presente, de lo contrario `null`.
   */
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  /**
   * Verifica si el usuario está autenticado.
   *
   * @returns {boolean} - `true` si el usuario está autenticado, `false` en caso contrario.
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Obtiene los encabezados de autenticación necesarios para las solicitudes HTTP.
   *
   * @returns {HttpHeaders} - Los encabezados de autenticación.
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  
  getIdJugador(): number {
    const idJugador = localStorage.getItem('idJugador');
    return idJugador ? parseInt(idJugador, 10) : -1; 



}
}
