import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'main', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/main-content/main-content.component').then(m => m.MainContentComponent),
    children: [
      {
        path: 'peliculas',
        loadComponent: () => import('./features/peliculas/components/peliculas-list/peliculas-list.component')
          .then(m => m.PeliculasListComponent)
      },
      {
        path: 'peliculas/crear',
        loadComponent: () => import('./features/peliculas/components/peliculas-form/peliculas-form.component').then(m => m.PeliculasFormComponent)
      },
      {
        path: 'peliculas/editar/:id',
        loadComponent: () => import('./features/peliculas/components/peliculas-form/peliculas-form.component').then(m => m.PeliculasFormComponent)
      },
      {
        path: 'videojuegos',
        loadComponent: () => import('./features/videojuegos/components/videojuegos-list/videojuegos-list.component').then(m => m.VideojuegosListComponent)
      },
      {
        path: 'videojuegos/crear',
        loadComponent: () => import('./features/videojuegos/components/videojuegos-form/videojuegos-form.component').then(m => m.VideojuegosFormComponent)
      },
      {
        path: 'videojuegos/editar/:id',
        loadComponent: () => import('./features/videojuegos/components/videojuegos-form/videojuegos-form.component').then(m => m.VideojuegosFormComponent)
      },
      {
        path: 'series',
        loadComponent: () => import('./features/series/components/series-list/series-list.component').then(m => m.SeriesListComponent)
      },
      {
        path: 'series/crear',
        loadComponent: () => import('./features/series/components/series-form/series-form.component').then(m => m.SeriesFormComponent)
      },
      {
        path: 'series/editar/:id',
        loadComponent: () => import('./features/series/components/series-form/series-form.component').then(m => m.SeriesFormComponent)
      },
      {
        path: 'comics',
        loadComponent: () => import('./features/comics/components/comics-list/comics-list.component').then(m => m.ComicsListComponent)
      },
      {
        path: 'comics/crear',
        loadComponent: () => import('./features/comics/components/comics-form/comics-form.component').then(m => m.ComicsFormComponent)
      },
      {
        path: 'comics/editar/:id',
        loadComponent: () => import('./features/comics/components/comics-form/comics-form.component').then(m => m.ComicsFormComponent)
      },
      { path: '', redirectTo: 'peliculas', pathMatch: 'full' } // Ruta por defecto
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];