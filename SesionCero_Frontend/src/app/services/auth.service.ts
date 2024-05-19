import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8087/jugador'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(token => {
        localStorage.setItem('jwtToken', token); 
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken'); 
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
