import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comic } from '../../../store/models/comic.model';
import { AuthService } from '../../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({ providedIn: 'root' })
export class ComicsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:10000/api/comics/';

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
  
    obtenerComic(id: number): Observable<Comic> {
      return this.http.get<Comic>(`${this.apiUrl}${id}/`, {
        headers: this.getAuthHeaders()
      });
    }
  
    crearComic(comic: Omit<Comic, 'id'>): Observable<Comic> {
      return this.http.post<Comic>(this.apiUrl, comic, {
        headers: this.getAuthHeaders()
      }).pipe(
        catchError(this.handleError)
      );
    }
  
    actualizarComic(id: number, comic: Comic): Observable<Comic> {
      return this.http.put<Comic>(`${this.apiUrl}${id}/`, comic, {
        headers: this.getAuthHeaders()
      }).pipe(
        catchError(this.handleError)
      );
    }
  
    eliminarComic(id: number): Observable<void> {
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
    return throwError(() => new Error('Ocurrió un error al obtener los comics'));
  }
}