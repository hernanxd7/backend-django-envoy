import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteVendedor, loadVendedores } from '../../actions/vendedores.actions';
import { Vendedor } from '../../models/Vendedor';
import { selectError, selectLoading, selectVendedores } from '../../selectors/vendedores.selectors';

@Component({
  selector: 'app-vendedores-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Lista de Vendedores</h2>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        [routerLink]="['/vendedores/create']"
      >
        Nuevo Vendedor
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
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
              <th class="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let vendedor of vendedores$ | async" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ vendedor.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ vendedor.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ vendedor.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ vendedor.telefono }}</td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                <button
                  (click)="editVendedor(vendedor.id)"
                  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  (click)="deleteVendedor(vendedor.id)"
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
export class VendedoresListComponent implements OnInit {
  vendedores$: Observable<Vendedor[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.vendedores$ = this.store.select(selectVendedores);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadVendedores());
  }

  editVendedor(id: number): void {
    this.router.navigate([`/vendedores/edit/${id}`]);
  }

  deleteVendedor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este vendedor?')) {
      this.store.dispatch(deleteVendedor({ vendedorId: id }));
    }
  }
}