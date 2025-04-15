import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <div>
      <h2>Datos Protegidos</h2>
      
      <div>
        <h3>Películas</h3>
        <button (click)="loadPeliculas()">Cargar Películas</button>
        @if (peliculasLoading) {
          <p>Cargando películas...</p>
        }
        @if (peliculasError) {
          <p class="error">{{ peliculasError }}</p>
        }
        @if (peliculas) {
          <pre>{{ peliculas | json }}</pre>
        }
      </div>

      <div>
        <h3>Videojuegos</h3>
        <button (click)="loadVideojuegos()">Cargar Videojuegos</button>
        @if (videojuegosLoading) {
          <p>Cargando videojuegos...</p>
        }
        @if (videojuegosError) {
          <p class="error">{{ videojuegosError }}</p>
        }
        @if (videojuegos) {
          <pre>{{ videojuegos | json }}</pre>
        }
      </div>
    </div>
  `,
  styles: [`
    .error { color: red; }
  `]
})
export class UserListComponent {
  peliculas: any;
  peliculasLoading = false;
  peliculasError = '';

  videojuegos: any;
  videojuegosLoading = false;
  videojuegosError = '';

  constructor(private apiService: ApiService) {}

  loadPeliculas(): void {
    this.peliculasLoading = true;
    this.peliculasError = '';
    
    this.apiService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
        this.peliculasLoading = false;
      },
      error: (err) => {
        this.peliculasError = 'Error al cargar películas. ¿Estás autenticado?';
        this.peliculasLoading = false;
        console.error('Error loading peliculas:', err);
      }
    });
  }

  loadVideojuegos(): void {
    this.videojuegosLoading = true;
    this.videojuegosError = '';
    
    this.apiService.getVideojuegos().subscribe({
      next: (data) => {
        this.videojuegos = data;
        this.videojuegosLoading = false;
      },
      error: (err) => {
        this.videojuegosError = 'Error al cargar videojuegos. ¿Estás autenticado?';
        this.videojuegosLoading = false;
        console.error('Error loading videojuegos:', err);
      }
    });
  }
}