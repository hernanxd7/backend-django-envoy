import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Serie } from '../../../store/models/serie.model';
import { AuthService } from '../../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({ providedIn: 'root' })
export class SeriesService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:10000/api/series/';

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
    
      obtenerSerie(id: number): Observable<Serie> {
        return this.http.get<Serie>(`${this.apiUrl}${id}/`, {
          headers: this.getAuthHeaders()
        });
      }
    
    
      crearSerie(serie: Omit<Serie, 'id'>): Observable<Serie> {
        return this.http.post<Serie>(this.apiUrl, serie, {
          headers: this.getAuthHeaders()
        }).pipe(
          catchError(this.handleError)
        );
      }
    
      actualizarSerie(id: number, serie: Serie): Observable<Serie> {
        return this.http.put<Serie>(`${this.apiUrl}${id}/`, serie, {
          headers: this.getAuthHeaders()
        }).pipe(
          catchError(this.handleError)
        );
      }
    
      eliminarSerie(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/`, {
          headers: this.getAuthHeaders()
        }).pipe(
          catchError(this.handleError)
        );
      }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error('Ocurrió un error al obtener las series'));
  }
}