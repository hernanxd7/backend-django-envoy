import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Videojuego } from '../../../store/models/videojuego.model';
import { AuthService } from '../../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({ providedIn: 'root' })
export class VideojuegosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:10000/api/videojuegos/';

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerVideojuegos(): Observable<Videojuego[]> {
    return this.http.get<Videojuego[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerVideojuego(id: number): Observable<Videojuego> {
    return this.http.get<Videojuego>(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders()
    });
  }

  crearVideojuego(videojuego: Omit<Videojuego, 'id'>): Observable<Videojuego> {
    return this.http.post<Videojuego>(this.apiUrl, videojuego, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  actualizarVideojuego(id: number, videojuego: Videojuego): Observable<Videojuego> {
    return this.http.put<Videojuego>(`${this.apiUrl}${id}/`, videojuego, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  eliminarVideojuego(id: number): Observable<void> {
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
    return throwError(() => new Error('Ocurrió un error al obtener los videojuegos'));
  }
}