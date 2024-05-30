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
   * El constructor del servicio. Aquí se inyectan las dependencias necesarias.
   *
   * @param {HttpClient} http - Para realizar solicitudes HTTP.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Maneja el proceso de inicio de sesión.
   *
   * Envía las credenciales de inicio de sesión al servidor y guarda el token JWT en el almacenamiento local.
   *
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Observable<{ token: string; idJugador: number }>} - Un observable que emite la respuesta del servidor.
   */
  login(
    email: string,
    password: string
  ): Observable<{ token: string; idJugador: number }> {
    return this.http
      .post<{ token: string; idJugador: number }>(`${this.baseUrl}/login`, {
        username: email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('jwtToken', response.token);
        })
      );
  }

  /**
   * Maneja el cierre de sesión.
   *
   * Elimina el token JWT del almacenamiento local y redirige al usuario a la página de inicio.
   */
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/']);
  }

  /**
   * Obtiene el token JWT almacenado.
   *
   * @returns {string | null} - El token JWT si está presente, de lo contrario `null`.
   */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
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
}
