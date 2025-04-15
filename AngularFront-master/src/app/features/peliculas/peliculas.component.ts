import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Listado de Películas</h2>
    @if (peliculas) {
      <ul>
        @for (pelicula of peliculas; track pelicula.id) {
          <li>{{ pelicula.titulo }}</li>
        }
      </ul>
    }
  `
})
export class PeliculasComponent {
  peliculas: any;

  constructor(private apiService: ApiService) {
    this.loadPeliculas();
  }

  loadPeliculas(): void {
    this.apiService.getPeliculas().subscribe({
      next: (data) => this.peliculas = data,
      error: (err) => console.error('Error loading peliculas:', err)
    });
  }
}