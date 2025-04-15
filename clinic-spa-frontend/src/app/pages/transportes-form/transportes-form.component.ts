import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createTransporte, loadTransporte, updateTransporte } from '../../actions/transportes.actions';
import { Transporte } from '../../models/Transporte';

@Component({
  selector: 'app-transportes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Editar' : 'Nuevo' }} Transporte</h2>

      <form [formGroup]="transporteForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="modelo">
            Modelo
          </label>
          <input
            type="text"
            id="modelo"
            formControlName="modelo"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': transporteForm.get('modelo')?.invalid && transporteForm.get('modelo')?.touched}"
          >
          <div *ngIf="transporteForm.get('modelo')?.invalid && transporteForm.get('modelo')?.touched" class="text-red-500 text-xs mt-1">
            El modelo es requerido
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="capacidad">
            Capacidad
          </label>
          <input
            type="number"
            id="capacidad"
            formControlName="capacidad"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': transporteForm.get('capacidad')?.invalid && transporteForm.get('capacidad')?.touched}"
          >
          <div *ngIf="transporteForm.get('capacidad')?.invalid && transporteForm.get('capacidad')?.touched" class="text-red-500 text-xs mt-1">
            La capacidad es requerida y debe ser un número válido
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="año">
            Año
          </label>
          <input
            type="number"
            id="año"
            formControlName="año"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': transporteForm.get('año')?.invalid && transporteForm.get('año')?.touched}"
          >
          <div *ngIf="transporteForm.get('año')?.invalid && transporteForm.get('año')?.touched" class="text-red-500 text-xs mt-1">
            El año es requerido y debe ser un número válido
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            [disabled]="transporteForm.invalid"
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
export class TransportesFormComponent implements OnInit {
  transporteForm: FormGroup;
  isEditing = false;
  transporteId?: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.transporteForm = this.fb.group({
      modelo: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(0)]],
      año: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.transporteId = +id;
      this.store.dispatch(loadTransporte({ transporteId: this.transporteId }));
      // Aquí deberías suscribirte al selector del transporte específico cuando lo implementes
    }
  }

  onSubmit(): void {
    if (this.transporteForm.valid) {
      const transporte: Partial<Transporte> = this.transporteForm.value;
      
      if (this.isEditing && this.transporteId) {
        this.store.dispatch(updateTransporte({
          transporte: { ...transporte, id: this.transporteId }
        }));
      } else {
        this.store.dispatch(createTransporte({ transporte }));
      }
      
      this.router.navigate(['/transportes']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/transportes']);
  }
}