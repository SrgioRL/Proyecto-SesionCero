import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../interfaces/personaje.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  private baseUrl = 'http://localhost:8087/personaje';

  constructor(private http: HttpClient) { }

  altaPersonaje(personaje: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(`${this.baseUrl}/alta`, personaje);
  }

  eliminarPersonaje(idPersonaje: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${idPersonaje}`);
  }

  mostrarPersonaje(idPersonaje: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.baseUrl}/uno/${idPersonaje}`);
  }

  modificarPersonaje(personaje: Personaje): Observable<Personaje> {
    return this.http.put<Personaje>(`${this.baseUrl}/modificar`, personaje);
  }

  buscarPersonajes(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${this.baseUrl}/todos`);
  }

  incrementarCaracteristicas(idPersonaje: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/incrementar/${idPersonaje}`, null);
  }
}
