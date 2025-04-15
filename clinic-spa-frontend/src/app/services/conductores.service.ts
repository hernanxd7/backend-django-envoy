import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Conductor } from "../models/Conductor";

@Injectable({ providedIn: 'root' })
export class ConductoresService {
  // Cambiemos la URL para usar el mismo patrón que las otras APIs que funcionan
  private apiUrl = 'http://127.0.0.1:8000/api/conductores/'

  constructor(private http: HttpClient) {}

  getConductores(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createConductor(conductor: Omit<Conductor, 'id'> | Conductor): Observable<Conductor> {
    return this.http.post<Conductor>(this.apiUrl, conductor).pipe(
      catchError(this.handleError)
    );
  }

  updateConductor(conductor: Conductor): Observable<Conductor> {
    const url = `${this.apiUrl}${conductor.id}/`;
    return this.http.put<Conductor>(url, conductor).pipe(
      catchError(this.handleError)
    );
  }

  deleteConductor(conductorId: number): Observable<void> {
    const url = `${this.apiUrl}${conductorId}/`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getConductorById(conductorId: number): Observable<Conductor> {
    const url = `${this.apiUrl}${conductorId}/`;
    return this.http.get<Conductor>(url).pipe(
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
      if (error.status === 403) {
        errorMessage = 'No tienes permisos para acceder a este recurso. Por favor, contacta al administrador.';
      } else {
        errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      }
      if (error.error && error.error.detail) {
        console.error('Detalle del error:', error.error.detail);
      }
    }
    console.error('Error en ConductoresService:', errorMessage);
    return throwError(() => error);
  }
}