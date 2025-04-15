import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:10000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Ejemplo para películas
  getPeliculas() {
    return this.http.get(`${this.apiUrl}/peliculas/`);
  }

  // Ejemplo para videojuegos
  getVideojuegos() {
    return this.http.get(`${this.apiUrl}/videojuegos/`);
  }

  // Ejemplo para series
  getSeries() {
    return this.http.get(`${this.apiUrl}/series/`);
  }

  //Videojuegos

  // Método para crear nuevo videojuego
  createVideojuego(videojuegoData: any) {
    return this.http.post(`${this.apiUrl}/videojuegos/`, videojuegoData);
  }

  // Método para actualizar videojuego
  updateVideojuego(id: number, videojuegoData: any) {
    return this.http.put(`${this.apiUrl}/videojuegos/${id}/`, videojuegoData);
  }

  // Método para eliminar
  deleteItem(endpoint: string, id: number) {
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}/`);
  }

  //Peliculas
  
  // Método para crear nuevo videojuego
  createPelicula(peliculaData: any) {
    return this.http.post(`${this.apiUrl}/peliculas/`, peliculaData);
  }

  // Método para actualizar videojuego
  updatePelicula(id: number, peliculaData: any) {
    return this.http.put(`${this.apiUrl}/videojuegos/${id}/`, peliculaData);
  }

}