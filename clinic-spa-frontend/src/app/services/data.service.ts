// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, switchMap, finalize, shareReplay } from 'rxjs/operators';

export interface User {
  // Tendrás que modificar tu interfaz
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.example.com/users'; // Tienes que aquí poner la información de tu API
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(() => console.log('Users fetched')),
      catchError(error => {
        this.errorSubject.next('Failed to fetch users');
        return throwError(() => new Error(error));
      }),
      finalize(() => this.loadingSubject.next(false)),
      shareReplay(1)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.errorSubject.next(`Failed to fetch user with ID ${id}`);
        return throwError(() => new Error(error));
      })
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(error => {
        this.errorSubject.next('Failed to create user');
        return throwError(() => new Error(error));
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(error => {
        this.errorSubject.next(`Failed to update user with ID ${user.id}`);
        return throwError(() => new Error(error));
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.errorSubject.next(`Failed to delete user with ID ${id}`);
        return throwError(() => new Error(error));
      })
    );
  }
}
