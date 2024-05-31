import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Servicio para manejar las operaciones CRUD con el backend.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendUrl = 'http://localhost:8087';

  /**
   * Constructor
   *
   * @param {HttpClient} http - Para realizar solicitudes HTTP.
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtiene los datos del backend.
   *
   * Utiliza una solicitud GET para obtener los datos desde la URL especificada del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @returns {Observable<any>} - Emite la respuesta del backend.
   */
  getData(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${this.backendUrl}/data`, { headers });
  }

  /**
   * Envía datos al backend.
   *
   * Utiliza una solicitud POST para enviar los datos al backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {any} data - Los datos a enviar.
   * @returns {Observable<any>} - Emite la respuesta del backend.
   */
  postData(data: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.backendUrl}/data`, data, { headers });
  }

  /**
   * Actualiza datos en el backend.
   *
   * Utiliza una solicitud PUT para actualizar los datos en el backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} id - El ID de los datos a actualizar.
   * @param {any} newData - Los nuevos datos.
   * @returns {Observable<any>} - Emite la respuesta del backend.
   */
  updateData(id: number, newData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(`${this.backendUrl}/data/${id}`, newData, { headers });
  }

  /**
   * Elimina datos del backend.
   *
   * Utiliza una solicitud DELETE para eliminar los datos del backend.
   * Incluye los encabezados de autenticación necesarios.
   *
   * @param {number} id - El ID de los datos a eliminar.
   * @returns {Observable<any>} - Emite la respuesta del backend.
   */
  deleteData(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.backendUrl}/data/${id}`, { headers });
  }
}
