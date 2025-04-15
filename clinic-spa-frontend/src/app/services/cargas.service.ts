import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Carga } from "../models/Carga";

@Injectable({ providedIn: 'root' })
export class CargasService {
  private apiUrl = 'http://127.0.0.1:8000/api/cargas/'

  constructor(private http: HttpClient) {}

  getCargas(): Observable<Carga[]> {
    return this.http.get<Carga[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createCarga(carga: Partial<Omit<Carga, 'id'>>): Observable<Carga> {
    console.log('Enviando carga al servidor:', carga); // Para depuración
    return this.http.post<Carga>(this.apiUrl, carga).pipe(
      catchError(this.handleError)
    );
  }

  updateCarga(carga: Carga): Observable<Carga> {
    const url = `${this.apiUrl}${carga.id}/`;
    return this.http.put<Carga>(url, carga).pipe(
      catchError(this.handleError)
    );
  }

  deleteCarga(cargaId: number): Observable<void> {
    const url = `${this.apiUrl}${cargaId}/`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getCargaById(cargaId: number): Observable<Carga> {
    const url = `${this.apiUrl}${cargaId}/`;
    return this.http.get<Carga>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en CargasService:', error);
    return throwError(() => error);
  }
}