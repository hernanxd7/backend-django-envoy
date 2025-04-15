import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { createCarga, updateCarga } from '../../actions/cargas.actions';
import { Carga } from '../../models/Carga';
import { CargasService } from '../../services/cargas.service';

@Component({
  selector: 'app-cargas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cargas-form.component.html',
  styles: []
})
export class CargasFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private cargasService = inject(CargasService);
  private router = inject(Router);

  cargaForm: FormGroup;
  isEditing = false;
  cargaId?: number;

  constructor() {
    this.cargaForm = this.fb.group({
      descripcion: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cargaId = +id;
      this.cargasService.getCargaById(this.cargaId)
        .pipe(take(1))
        .subscribe(carga => {
          this.cargaForm.patchValue(carga);
        });
    }
  }

  onSubmit(): void {
    if (this.cargaForm.valid) {
      const formValue = this.cargaForm.value;
      
      if (this.isEditing && this.cargaId) {
        const carga: Carga = {
          id: this.cargaId,
          descripcion: formValue.descripcion,
          peso: formValue.peso,
          tipo: 'Estándar',
          fecha_registro: new Date().toISOString().split('T')[0],
          origen: 'Origen predeterminado',
          destino: 'Destino predeterminado',
          vendedor_id: 1,
          // Campos adicionales requeridos por el backend
          volumen: 1.0,
          fecha_recogida: new Date().toISOString(),
          fecha_entrega: new Date(Date.now() + 86400000).toISOString() // Un día después
        };
        this.store.dispatch(updateCarga({ carga }));
      } else {
        const carga = {
          descripcion: formValue.descripcion,
          peso: formValue.peso,
          tipo: 'Estándar',
          fecha_registro: new Date().toISOString().split('T')[0],
          origen: 'Origen predeterminado',
          destino: 'Destino predeterminado',
          vendedor_id: 1,
          // Campos adicionales requeridos por el backend
          volumen: 1.0,
          fecha_recogida: new Date().toISOString(),
          fecha_entrega: new Date(Date.now() + 86400000).toISOString() // Un día después
        };
        this.store.dispatch(createCarga({ carga }));
      }
      
      this.router.navigate(['/cargas']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/cargas']);
  }
}