import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { crearSerie, actualizarSerie } from '../../../../store/actions/series.actions';
import { Serie } from '../../../../store/models/serie.model';
import { SeriesService } from '../../services/series.service';
import { Observable, take } from 'rxjs';


@Component({
  selector: 'app-series-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.css']
})
export class SeriesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);  
  private seriesService = inject(SeriesService);

  router = inject(Router);

  form: FormGroup;
  isEdit = false;
  serieId: number | null = null;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      temporadas: [null, [Validators.required]],
      fecha_lanzamiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.serieId = +id;
      this.seriesService.obtenerSerie(this.serieId)
        .pipe(take(1))
        .subscribe(serie => {
          this.form.patchValue(serie);
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      if (this.isEdit && this.serieId) {
        const serie: Serie = {
          id: this.serieId,
          ...formValue
        };
        this.store.dispatch(actualizarSerie({ id: this.serieId, serie }));
      } else {
        const serie: Omit<Serie, 'id'> = formValue;
        this.store.dispatch(crearSerie({ serie }));
      }
    }
  }
}