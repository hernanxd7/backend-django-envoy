import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { crearComic, actualizarComic } from '../../../../store/actions/comics.actions';
import { Comic } from '../../../../store/models/comic.model';
import { ComicsService } from '../../services/comics.service';
import { Observable, take } from 'rxjs';


@Component({
  selector: 'app-comics-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comics-form.component.html',
  styleUrls: ['./comics-form.component.css']
})
export class ComicsFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);  
  private comicsService = inject(ComicsService);

  router = inject(Router);

  form: FormGroup;
  isEdit = false;
  comicId: number | null = null;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      autor: [null, [Validators.required]],
      fecha_lanzamiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.comicId = +id;
      this.comicsService.obtenerComic(this.comicId)
        .pipe(take(1))
        .subscribe(comic => {
          this.form.patchValue(comic);
        });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      if (this.isEdit && this.comicId) {
        const comic: Comic = {
          id: this.comicId,
          ...formValue
        };
        this.store.dispatch(actualizarComic({ id: this.comicId, comic }));
      } else {
        const comic: Omit<Comic, 'id'> = formValue;
        this.store.dispatch(crearComic({ comic }));
      }
    }
  }
}