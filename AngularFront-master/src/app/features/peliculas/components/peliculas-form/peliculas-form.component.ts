import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { crearPelicula, actualizarPelicula} from '../../../../store/actions/peliculas.actions';
import { Pelicula } from '../../../../store/models/pelicula.model';
import { PeliculasService } from '../../services/peliculas.service';
import { Observable, take } from 'rxjs';


@Component({
  selector: 'app-peliculas-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './peliculas-form.component.html',
  styleUrls: ['./peliculas-form.component.css']
})
export class PeliculasFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);  
  private peliculasService = inject(PeliculasService);

  router = inject(Router);

  form: FormGroup;
  isEdit = false;
  peliculaId: number | null = null;

  constructor() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      anio: [null, [Validators.required]],
      duracion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.peliculaId = +id;
      this.peliculasService.obtenerPelicula(this.peliculaId)
        .pipe(take(1))
        .subscribe(pelicula => {
          this.form.patchValue(pelicula);
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      if (this.isEdit && this.peliculaId) {
        const pelicula: Pelicula = {
          id: this.peliculaId,
          ...formValue
        };
        this.store.dispatch(actualizarPelicula({ id: this.peliculaId, pelicula}));
      } else {
        const pelicula: Omit<Pelicula, 'id'> = formValue;
        this.store.dispatch(crearPelicula({ pelicula }));
      }
    }
  }
}