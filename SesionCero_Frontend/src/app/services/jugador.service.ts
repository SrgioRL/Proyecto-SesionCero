import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private baseUrl = 'http://localhost:8087/jugador'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo jugador
  altaJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(`${this.baseUrl}/alta`, jugador);
  }

  // Método para eliminar un jugador por su ID
  eliminarJugador(idJugador: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${idJugador}`);
  }
  
  // Método para obtener un jugador por su ID
  mostrarJugador(idJugador: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.baseUrl}/uno/${idJugador}`);
  }

  // Método para modificar un jugador
  modificarJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.baseUrl}/modificar`, jugador);
  }

  // Método para buscar todos los jugadores
  buscarJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.baseUrl}/todos`);
  }
}
