import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';
import { AuthService } from './auth.service';

/**
 * Servicio para manejar las operaciones CRUD relacionadas con los jugadores.
 */
@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private baseUrl = 'http://localhost:8087/jugador'; // URL base del backend

  /**
   * El constructor del servicio. Aquí se inyectan las dependencias necesarias.
   *
   * @param {HttpClient} http - Para realizar solicitudes HTTP.
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Registra un nuevo jugador.
   *
   * Utiliza una solicitud POST para enviar los datos del jugador al backend.
   *
   * @param {Jugador} jugador - Los datos del jugador a registrar.
   * @returns {Observable<Jugador>} - Emite la respuesta del backend.
   */
  altaJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(`${this.baseUrl}/alta`, jugador);
  }

  /**
   * Elimina un jugador por su ID.
   *
   * Utiliza una solicitud DELETE para eliminar el jugador del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} idJugador - El ID del jugador a eliminar.
   * @returns {Observable<any>} - Emite la respuesta del backend.
   */
  eliminarJugador(idJugador: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${idJugador}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Obtiene los datos de un jugador por su ID.
   *
   * Utiliza una solicitud GET para obtener los datos del jugador del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} idJugador - El ID del jugador a obtener.
   * @returns {Observable<Jugador>} - Emite los datos del jugador.
   */
  mostrarJugador(idJugador: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.baseUrl}/uno/${idJugador}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Modifica los datos de un jugador.
   *
   * Utiliza una solicitud PUT para enviar los nuevos datos del jugador al backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {Jugador} jugador - Los nuevos datos del jugador.
   * @returns {Observable<Jugador>} - Emite la respuesta del backend.
   */
  modificarJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.baseUrl}/modificar`, jugador, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Obtiene una lista de todos los jugadores.
   *
   * Utiliza una solicitud GET para obtener los datos de todos los jugadores del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @returns {Observable<Jugador[]>} - Emite la lista de jugadores.
   */
  buscarJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.baseUrl}/todos`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
