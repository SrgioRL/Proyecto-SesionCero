import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../interfaces/personaje.interface';
import { AuthService } from './auth.service';

/**
 * Servicio para manejar las operaciones CRUD relacionadas con los personajes.
 */
@Injectable({
  providedIn: 'root',
})
export class PersonajeService {
  private baseUrl = 'http://localhost:8087/personaje';

  /**
   * El constructor del servicio. Aquí se inyectan las dependencias necesarias.
   *
   * @param {HttpClient} http - Para realizar solicitudes HTTP.
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Registra un nuevo personaje.
   *
   * Utiliza una solicitud POST para enviar los datos del personaje al backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {Personaje} personaje - Los datos del personaje a registrar.
   * @returns {Observable<Personaje>} - Emite la respuesta del backend.
   */
  altaPersonaje(personaje: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(`${this.baseUrl}/alta`, personaje, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Elimina un personaje por su ID.
   *
   * Utiliza una solicitud DELETE para eliminar el personaje del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} idPersonaje - El ID del personaje a eliminar.
   * @returns {Observable<string>} - Emite la respuesta del backend.
   */
  eliminarPersonaje(idPersonaje: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${idPersonaje}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Obtiene los datos de un personaje por su ID.
   *
   * Utiliza una solicitud GET para obtener los datos del personaje del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} idPersonaje - El ID del personaje a obtener.
   * @returns {Observable<Personaje>} - Emite los datos del personaje.
   */
  mostrarPersonaje(idPersonaje: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.baseUrl}/uno/${idPersonaje}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Modifica los datos de un personaje.
   *
   * Utiliza una solicitud PUT para enviar los nuevos datos del personaje al backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {Personaje} personaje - Los nuevos datos del personaje.
   * @returns {Observable<Personaje>} - Emite la respuesta del backend.
   */
  modificarPersonaje(personaje: Personaje): Observable<Personaje> {
    return this.http.put<Personaje>(`${this.baseUrl}/modificar`, personaje, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Obtiene una lista de todos los personajes.
   *
   * Utiliza una solicitud GET para obtener los datos de todos los personajes del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @returns {Observable<Personaje[]>} - Emite la lista de personajes.
   */
  buscarPersonajes(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${this.baseUrl}/todos`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Incrementa las características de un personaje por su ID.
   *
   * Utiliza una solicitud POST para incrementar las características del personaje en el backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} idPersonaje - El ID del personaje a incrementar características.
   * @returns {Observable<string>} - Emite la respuesta del backend.
   */
  incrementarCaracteristicas(idPersonaje: number): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/incrementar/${idPersonaje}`,
      null,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  /**
   * Obtiene una lista de personajes por el ID del jugador.
   *
   * Utiliza una solicitud GET para obtener los personajes asociados a un jugador del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} idJugador - El ID del jugador cuyos personajes se van a obtener.
   * @returns {Observable<Personaje[]>} - Emite la lista de personajes.
   */
  obtenerPersonajesPorIdJugador(idJugador: number): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(
      `${this.baseUrl}/${idJugador}/personajes`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  /**
   * Obtiene el retrato de un personaje por su ID.
   *
   * Utiliza una solicitud GET para obtener el retrato del personaje del backend.
   * Incluye los encabezados de autenticación necesarios y especifica el tipo de respuesta como blob.
   *
   * @param {number} idPersonaje - El ID del personaje cuyo retrato se va a obtener.
   * @returns {Observable<any>} - Emite el retrato del personaje.
   */
  obtenerRetrato(idPersonaje: number): Observable<any> {
    const options = {
      responseType: 'blob' as 'json',
      headers: this.authService.getAuthHeaders(),
    };
    return this.http.get(`${this.baseUrl}/${idPersonaje}/retrato`, options);
  }
}
