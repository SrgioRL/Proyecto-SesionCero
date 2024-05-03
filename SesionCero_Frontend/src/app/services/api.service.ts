import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendUrl = 'http://localhost:8087'; // URL base del backend

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.backendUrl}/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/data`, data);
  }

  updateData(id: number, newData: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/data/${id}`, newData);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/data/${id}`);
  }
}
