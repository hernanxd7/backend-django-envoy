import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Transporte } from "../models/Transporte";

@Injectable({ providedIn: 'root' })
export class TransportesService {
  private apiUrl = 'http://127.0.0.1:8000/api/transportes/'

  constructor(private http: HttpClient) {}

  getTransportes(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createTransporte(transporte: Omit<Transporte, 'id'>): Observable<Transporte> {
    return this.http.post<Transporte>(this.apiUrl, transporte).pipe(
      catchError(this.handleError)
    );
  }

  updateTransporte(transporte: Transporte): Observable<Transporte> {
    const url = `${this.apiUrl}${transporte.id}/`;
    return this.http.put<Transporte>(url, transporte).pipe(
      catchError(this.handleError)
    );
  }

  deleteTransporte(transporteId: number): Observable<void> {
    const url = `${this.apiUrl}${transporteId}/`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getTransporteById(transporteId: number): Observable<Transporte> {
    const url = `${this.apiUrl}${transporteId}/`;
    return this.http.get<Transporte>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en TransportesService:', error);
    return throwError(() => error);
  }
}