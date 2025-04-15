import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createVendedor, loadVendedor, updateVendedor } from '../../actions/vendedores.actions';
import { Vendedor } from '../../models/Vendedor';

@Component({
  selector: 'app-vendedores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Editar' : 'Nuevo' }} Vendedor</h2>

      <form [formGroup]="vendedorForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            formControlName="nombre"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': vendedorForm.get('nombre')?.invalid && vendedorForm.get('nombre')?.touched}"
          >
          <div *ngIf="vendedorForm.get('nombre')?.invalid && vendedorForm.get('nombre')?.touched" class="text-red-500 text-xs mt-1">
            El nombre es requerido
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': vendedorForm.get('email')?.invalid && vendedorForm.get('email')?.touched}"
          >
          <div *ngIf="vendedorForm.get('email')?.invalid && vendedorForm.get('email')?.touched" class="text-red-500 text-xs mt-1">
            Por favor, ingrese un email válido
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="telefono">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            formControlName="telefono"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': vendedorForm.get('telefono')?.invalid && vendedorForm.get('telefono')?.touched}"
          >
          <div *ngIf="vendedorForm.get('telefono')?.invalid && vendedorForm.get('telefono')?.touched" class="text-red-500 text-xs mt-1">
            El teléfono es requerido
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            [disabled]="vendedorForm.invalid"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </button>
          <button
            type="button"
            (click)="onCancel()"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `
})
export class VendedoresFormComponent implements OnInit {
  vendedorForm: FormGroup;
  isEditing = false;
  vendedorId?: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vendedorForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.vendedorId = +id;
      this.store.dispatch(loadVendedor({ vendedorId: this.vendedorId }));
      // Aquí deberías suscribirte al selector del vendedor específico cuando lo implementes
    }
  }

  onSubmit(): void {
    if (this.vendedorForm.valid) {
      const vendedor: Partial<Vendedor> = this.vendedorForm.value;
      
      if (this.isEditing && this.vendedorId) {
        this.store.dispatch(updateVendedor({
          vendedor: { ...vendedor, id: this.vendedorId }
        }));
      } else {
        this.store.dispatch(createVendedor({ vendedor }));
      }
      
      this.router.navigate(['/vendedores']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/vendedores']);
  }
}