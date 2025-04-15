import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Inicio de Sesión</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Usuario:</label>
          <input type="text" formControlName="username">
          @if (usernameInvalid) {
            <div>Usuario es requerido</div>
          }
        </div>
        
        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" formControlName="password">
          @if (passwordInvalid) {
            <div>Contraseña es requerida</div>
          }
        </div>
        
        <button type="submit" [disabled]="!loginForm.valid || isLoading">
          @if (isLoading) {
            Cargando...
          } @else {
            Ingresar
          }
        </button>
      </form>
      
      @if (errorMessage) {
        <div>{{ errorMessage }}</div>
      }
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
  `]
})
export class LoginComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authSubscription: Subscription | null = null;

  loginForm: FormGroup;
  errorMessage = '';
  returnUrl = '/';
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  get usernameInvalid(): boolean {
    const control = this.loginForm.get('username');
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  get passwordInvalid(): boolean {
    const control = this.loginForm.get('password');
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) return;
  
    this.isLoading = true;
    this.errorMessage = '';
    
    const { username, password } = this.loginForm.value;
    
    this.authSubscription = this.authService.login(username, password).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.status === 401 
          ? 'Credenciales incorrectas' 
          : 'Error en el inicio de sesión';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}