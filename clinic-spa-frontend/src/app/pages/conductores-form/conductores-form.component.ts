import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createConductor, loadConductor, updateConductor } from '../../actions/conductores.actions';
import { Conductor } from '../../models/Conductor';

@Component({
  selector: 'app-conductores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Editar' : 'Nuevo' }} Conductor</h2>

      <form [formGroup]="conductorForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            formControlName="nombre"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': conductorForm.get('nombre')?.invalid && conductorForm.get('nombre')?.touched}"
          >
          <div *ngIf="conductorForm.get('nombre')?.invalid && conductorForm.get('nombre')?.touched" class="text-red-500 text-xs mt-1">
            El nombre es requerido
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="licencia">
            Licencia
          </label>
          <input
            type="text"
            id="licencia"
            formControlName="licencia"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': conductorForm.get('licencia')?.invalid && conductorForm.get('licencia')?.touched}"
          >
          <div *ngIf="conductorForm.get('licencia')?.invalid && conductorForm.get('licencia')?.touched" class="text-red-500 text-xs mt-1">
            El número de licencia es requerido
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
            [ngClass]="{'border-red-500': conductorForm.get('telefono')?.invalid && conductorForm.get('telefono')?.touched}"
          >
          <div *ngIf="conductorForm.get('telefono')?.invalid && conductorForm.get('telefono')?.touched" class="text-red-500 text-xs mt-1">
            El teléfono es requerido
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            [disabled]="conductorForm.invalid"
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
export class ConductoresFormComponent implements OnInit {
  conductorForm: FormGroup;
  isEditing = false;
  conductorId?: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.conductorForm = this.fb.group({
      nombre: ['', Validators.required],
      licencia: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.conductorId = +id;
      this.store.dispatch(loadConductor({ conductorId: this.conductorId }));
      // Aquí deberías suscribirte al selector del conductor específico cuando lo implementes
    }
  }

  onSubmit(): void {
    if (this.conductorForm.valid) {
      const formValue = this.conductorForm.value;
      
      if (this.isEditing && this.conductorId) {
        // Para actualizar, necesitamos asegurarnos de que todos los campos requeridos estén presentes
        const conductor: Conductor = {
          id: this.conductorId,
          nombre: formValue.nombre || '',
          apellido: formValue.apellido || '',
          licencia: formValue.licencia || '',
          telefono: formValue.telefono || '',
          fecha_contratacion: formValue.fecha_contratacion || new Date().toISOString().split('T')[0],
          estado: formValue.estado || 'Activo',
          experiencia_anos: formValue.experiencia_anos || 0
        };
        this.store.dispatch(updateConductor({ conductor }));
      } else {
        // Para crear, también necesitamos asegurarnos de que todos los campos requeridos estén presentes
        const conductor: Conductor = {
          id: 0, // El backend asignará el ID real
          nombre: formValue.nombre || '',
          apellido: formValue.apellido || '',
          licencia: formValue.licencia || '',
          telefono: formValue.telefono || '',
          fecha_contratacion: formValue.fecha_contratacion || new Date().toISOString().split('T')[0],
          estado: formValue.estado || 'Activo',
          experiencia_anos: formValue.experiencia_anos || 0
        };
        this.store.dispatch(createConductor({ conductor }));
      }
      
      this.router.navigate(['/conductores']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/conductores']);
  }
}