import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { crearVideojuego, actualizarVideojuego } from '../../../../store/actions/videojuegos.actions';
import { Videojuego } from '../../../../store/models/videojuego.model';
import { VideojuegosService } from '../../services/videojuegos.service';
import { Observable, take } from 'rxjs';


@Component({
  selector: 'app-videojuegos-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './videojuegos-form.component.html',
  styleUrls: ['./videojuegos-form.component.css']
})
export class VideojuegosFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);  
  private videojuegosService = inject(VideojuegosService);

  router = inject(Router);

  form: FormGroup;
  isEdit = false;
  videojuegoId: number | null = null;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1950)]],
      creador: ['', Validators.required],
      tipo: ['RPG', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.videojuegoId = +id;
      this.videojuegosService.obtenerVideojuego(this.videojuegoId)
        .pipe(take(1))
        .subscribe(videojuego => {
          this.form.patchValue(videojuego);
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      if (this.isEdit && this.videojuegoId) {
        const videojuego: Videojuego = {
          id: this.videojuegoId,
          ...formValue
        };
        this.store.dispatch(actualizarVideojuego({ id: this.videojuegoId, videojuego }));
      } else {
        const videojuego: Omit<Videojuego, 'id'> = formValue;
        this.store.dispatch(crearVideojuego({ videojuego }));
      }
    }
  }
}