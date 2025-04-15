import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteCarga, loadCargas } from '../../actions/cargas.actions';
import { Carga } from '../../models/Carga';
import { selectCargas, selectError, selectLoading } from '../../selectors/cargas.selectors';

@Component({
  selector: 'app-cargas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Lista de Cargas</h2>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        [routerLink]="['/cargas/create']"
      >
        Nueva Carga
      </button>

      <div *ngIf="loading$ | async" class="text-center">
        <p>Cargando...</p>
      </div>

      <div *ngIf="error$ | async as error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {{ error }}
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Peso</th>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let carga of cargas$ | async" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ carga.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ carga.descripcion }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ carga.peso }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                <button
                  (click)="editCarga(carga.id)"
                  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  (click)="deleteCarga(carga.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CargasListComponent implements OnInit {
  cargas$: Observable<Carga[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.cargas$ = this.store.select(selectCargas);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCargas());
  }

  editCarga(id: number): void {
    this.router.navigate([`/cargas/edit/${id}`]);
  }

  deleteCarga(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta carga?')) {
      this.store.dispatch(deleteCarga({ cargaId: id }));
    }
  }
}