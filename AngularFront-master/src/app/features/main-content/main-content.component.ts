import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="main-container">
      <nav>
        <ul>
          <li><a routerLink="/main/peliculas" routerLinkActive="active">Películas</a></li>
          <li><a routerLink="/main/videojuegos" routerLinkActive="active">Videojuegos</a></li>
          <li><a routerLink="/main/comics" routerLinkActive="active">Comics</a></li>
          <li><a routerLink="/main/series" routerLinkActive="active">Series</a></li>
          <li><button (click)="logout()">Cerrar Sesión</button></li>
        </ul>
      </nav>
      
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main-container { padding: 20px; }
    nav ul { display: flex; gap: 20px; list-style: none; padding: 0; }
    .active { font-weight: bold; }
  `]
})
export class MainContentComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}