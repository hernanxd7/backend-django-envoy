import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth, User } from '../models/auth';
import { LocalstorageService } from './localstorage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'https://us-east1-nr-software.cloudfunctions.net/uteq-login';
  private isAuthenticated = false;
  private redirectUrl: string | null = null;
  private authToken: string | null = null;
  private siteKey = '';
  private secretKey = '';
  private readonly TOKEN_KEY = 'token_Data';
  private readonly USER_DATA_KEY = 'USER_Data';
  private readonly SESSION_EXPIRY_KEY = 'sessionExpiryData';
  private readonly SESSION_DURATION = 5 * 24 * 60 * 60 * 1000;

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) { }

  // Login methods
  loginUser(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiURL}`, { email, password })
      .pipe(
        tap(user => {
          console.log('User Auth out if:', user);
          if (user.accessToken) {
            console.log('User Auth:', user);
            this.setUserSession(user);
          }
        })
      );
  }
  // Session management methods
  private setUserSession(user: Auth): void {
    console.log('User session set:', user);
    if (user.accessToken) {
      const data = {
        name: user.username,
        email: user.email,
        accessToken: user.accessToken,
        userId: user.userId,
        refreshToken: user.refreshToken
      };
      this.authToken = user.accessToken;
      this.setStorageItem(this.TOKEN_KEY, user.accessToken);
      this.setStorageItem(this.USER_DATA_KEY, JSON.stringify(data));
      this.setSessionExpiry();
      this.isAuthenticated = true;

      if (user.role === undefined) {
        const redirectUrl = this.getRedirectUrl();
        this.setRedirectUrl(redirectUrl || '/user');
      }
    } else {
      console.error('User token is undefined');
      this.isAuthenticated = false;
    }
  }

  private setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    sessionStorage.setItem(key, value);
  }

  private removeStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  private setSessionExpiry(): void {
    const expiryTime = new Date().getTime() + this.SESSION_DURATION;
    sessionStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
  }

  private checkSessionExpiry(): void {
    const expiryTime = sessionStorage.getItem(this.SESSION_EXPIRY_KEY);
    if (expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= +expiryTime) {
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
    this.checkSessionExpiry();
    this.authToken = this.getToken();
    return !!this.authToken;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    this.removeStorageItem(this.TOKEN_KEY);
    this.removeStorageItem(this.USER_DATA_KEY);
    sessionStorage.removeItem(this.SESSION_EXPIRY_KEY);
    this.clearSessionStorage();
    this.isAuthenticated = false;
    this.authToken = null;
    this.router.navigate(['/login']);
  }

  private clearSessionStorage(): void {
    sessionStorage.clear();
  }

  // Redirect URL methods
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    const url = this.redirectUrl;
    this.redirectUrl = null;
    return url;
  }
}
