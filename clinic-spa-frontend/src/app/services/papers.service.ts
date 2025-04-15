import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Paper } from "../models/Paper";

@Injectable({ providedIn: 'root' })
export class PapersService {
  // Asegúrate de que la URL coincida con la configurada en el backend
  private apiUrl = 'http://127.0.0.1:8000/api/papers/';  // Cambiado de 'research_papers' a 'papers'

  constructor(private http: HttpClient) {}

  getPapers(): Observable<Paper[]> {
    return this.http.get<Paper[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createPaper(paper: Omit<Paper, 'id'>): Observable<Paper> {
    return this.http.post<Paper>(this.apiUrl, paper).pipe(
      catchError(this.handleError)
    );
  }

  updatePaper(paper: Paper): Observable<Paper> {
    const url = `${this.apiUrl}${paper.id}/`;
    return this.http.put<Paper>(url, paper).pipe(
      catchError(this.handleError)
    );
  }

  deletePaper(paperId: number): Observable<void> {
    const url = `${this.apiUrl}${paperId}/`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getPaperById(paperId: number): Observable<Paper> {
    const url = `${this.apiUrl}${paperId}/`;
    return this.http.get<Paper>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en PapersService:', error);
    return throwError(() => error);
  }
}