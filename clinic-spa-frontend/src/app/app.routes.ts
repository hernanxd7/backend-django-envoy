import { Routes } from '@angular/router';
import { CargasFormComponent } from "./pages/cargas-form/cargas-form.component";
import { CargasListComponent } from "./pages/cargas-list/cargas-list.component";
import { PaperFormComponent } from './pages/paper-form/paper-form.component';
import { PaperListComponent } from "./pages/papers-list/paper-list.component";
import { ConductoresListComponent } from './pages/conductores-list/conductores-list.component';
import { ConductoresFormComponent } from './pages/conductores-form/conductores-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/papers', pathMatch: 'full' },
  
  // Rutas para Papers
  { path: 'papers', component: PaperListComponent },
  { path: 'papers/create', component: PaperFormComponent },
  { path: 'papers/edit/:id', component: PaperFormComponent },
  
  // Rutas para Cargas
  { path: 'cargas', component: CargasListComponent },
  { path: 'cargas/create', component: CargasFormComponent },
  { path: 'cargas/edit/:id', component: CargasFormComponent },
  
  // Rutas para Conductores
  { path: 'conductores', component: ConductoresListComponent },
  { path: 'conductores/create', component: ConductoresFormComponent },
  { path: 'conductores/edit/:id', component: ConductoresFormComponent },
  
  // Ruta para manejar rutas no encontradas
  { path: '**', redirectTo: '/papers' }
];

