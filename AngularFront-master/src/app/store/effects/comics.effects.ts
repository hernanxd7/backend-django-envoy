import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ComicsActions from '../actions/comics.actions';
import { ComicsService } from '../../features/comics/services/comics.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class ComicsEffects {
  private actions$ = inject(Actions);
  private comicsService = inject(ComicsService);

  cargarComics$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ComicsActions.cargarComics),
      mergeMap(() =>
        this.comicsService.obtenerComics().pipe(
          map(comics => 
            ComicsActions.comicsCargados({ comics })
          ),
          catchError(error => 
            of(ComicsActions.errorCargarComics({ error: error.message }))
          )
        )
      )
    )
  );

  private router = inject(Router);
  
  crearComic$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ComicsActions.crearComic),
      mergeMap(({ comic }) => 
        this.comicsService.crearComic(comic).pipe(
          map(comicRespuesta => {
            this.router.navigate(['/main/comics']); // Navegar aquí
            return ComicsActions.comicCreado({ 
              comic: comicRespuesta 
            });
          }),
          catchError(error => of(ComicsActions.errorCrearComic({ 
            error: error.message 
          })))
        )
      )
    )
  );
  
  actualizarComic$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ComicsActions.actualizarComic),
      mergeMap(({ id, comic }) => 
        this.comicsService.actualizarComic(id, comic).pipe(
          map(comicActualizado => 
            ComicsActions.comicActualizado({ comic: comicActualizado })
          ),
          catchError(error => 
            of(ComicsActions.errorActualizarComic({ error: error.message }))
          )
        )
      )
    )
  );

  eliminarComic$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ComicsActions.eliminarComic),
      mergeMap(({ id }) => 
        this.comicsService.eliminarComic(id).pipe(
          map(() => 
            ComicsActions.comicEliminado({ id })
          ),
          catchError(error => 
            of(ComicsActions.errorEliminarComic({ error: error.message }))
          )
        )
      )
    )
  );


  
}