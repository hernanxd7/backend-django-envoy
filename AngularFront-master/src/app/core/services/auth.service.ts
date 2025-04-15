import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:10000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Esto es seguro porque solo verifica localStorage
    this.isAuthenticatedSubject.next(this.hasToken()); 
  }

  private checkInitialAuth(): void {
    this.isAuthenticatedSubject.next(this.hasToken());
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{access: string, refresh: string}>(`${this.apiUrl}/token/`, { username, password }).pipe(
      tap(response => {
        this.storeTokens(response);
        this.isAuthenticatedSubject.next(true);
        // Redirige explícitamente a la ruta de videojuegos
        this.router.navigate(['/main/videojuegos']).then(() => {
          window.location.reload(); // Fuerza la actualización si es necesario
        });
      }),
      map(() => true),
      catchError(error => {
        this.clearTokens();
        this.isAuthenticatedSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout(redirectToLogin: boolean = true): void {
    this.clearTokens();
    this.isAuthenticatedSubject.next(false);
    if (redirectToLogin) {
      this.router.navigate(['/login']);
    }
  }

  // Versión síncrona para guards
  isAuthenticatedSync(): boolean {
    return this.hasToken();
  }

  // Versión observable para componentes
  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getAccessToken(): string | null {
    return this.isBrowser ? localStorage.getItem('access_token') : null;
  }

  private storeTokens(tokens: { access: string, refresh: string }): void {
    if (this.isBrowser) {
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
    }
  }

  private clearTokens(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private hasToken(): boolean {
    return this.isBrowser ? !!localStorage.getItem('access_token') : false;
  }
}