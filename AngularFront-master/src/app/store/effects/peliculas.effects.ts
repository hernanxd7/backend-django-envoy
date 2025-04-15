import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PeliculasActions from '../actions/peliculas.actions';
import { PeliculasService } from '../../features/peliculas/services/peliculas.service';
import { Router } from '@angular/router';

@Injectable()
export class PeliculasEffects {
  private actions$ = inject(Actions);
  private peliculasService = inject(PeliculasService);

  cargarPeliculas$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeliculasActions.cargarPeliculas),
      mergeMap(() =>
        this.peliculasService.obtenerPeliculas().pipe(
          map(peliculas => 
            PeliculasActions.peliculasCargadas({ peliculas })
          ),
          catchError(error => 
            of(PeliculasActions.errorCargarPeliculas({ error: error.message }))
          )
        )
      )
    )
  );
  

  private router = inject(Router);
  
  crearPelicula$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeliculasActions.crearPelicula),
      mergeMap(({ pelicula }) => 
        this.peliculasService.crearPelicula(pelicula).pipe(
          map(peliculaRespuesta => {
            this.router.navigate(['/main/peliculas']); // Navegar aquí
            return PeliculasActions.peliculaCreado({ 
              pelicula: peliculaRespuesta 
            });
          }),
          catchError(error => of(PeliculasActions.errorCrearPelicula({ 
            error: error.message 
          })))
        )
      )
    )
  );
  
  actualizarPelicula$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeliculasActions.actualizarPelicula),
      mergeMap(({ id, pelicula }) => 
        this.peliculasService.actualizarPelicula(id, pelicula).pipe(
          map(peliculaActualizado => 
            PeliculasActions.peliculaActualizado({ pelicula: peliculaActualizado })
          ),
          catchError(error => 
            of(PeliculasActions.errorActualizarPelicula({ error: error.message }))
          )
        )
      )
    )
  );

  eliminarPelicula$ = createEffect(() => 
    this.actions$.pipe(
      ofType(PeliculasActions.eliminarPelicula),
      mergeMap(({ id }) => 
        this.peliculasService.eliminarPelicula(id).pipe(
          map(() => 
            PeliculasActions.peliculaEliminado({ id })
          ),
          catchError(error => 
            of(PeliculasActions.errorEliminarPelicula({ error: error.message }))
          )
        )
      )
    )
  );
}