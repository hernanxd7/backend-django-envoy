import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Vendedor } from "../models/Vendedor";

@Injectable({ providedIn: 'root' })
export class VendedoresService {
  private apiUrl = 'http://127.0.0.1:8000/api/vendedores/'

  constructor(private http: HttpClient) {}

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createVendedor(vendedor: Omit<Vendedor, 'id'>): Observable<Vendedor> {
    return this.http.post<Vendedor>(this.apiUrl, vendedor).pipe(
      catchError(this.handleError)
    );
  }

  updateVendedor(vendedor: Vendedor): Observable<Vendedor> {
    const url = `${this.apiUrl}${vendedor.id}/`;
    return this.http.put<Vendedor>(url, vendedor).pipe(
      catchError(this.handleError)
    );
  }

  deleteVendedor(vendedorId: number): Observable<void> {
    const url = `${this.apiUrl}${vendedorId}/`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getVendedorById(vendedorId: number): Observable<Vendedor> {
    const url = `${this.apiUrl}${vendedorId}/`;
    return this.http.get<Vendedor>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en VendedoresService:', error);
    return throwError(() => error);
  }
  

}