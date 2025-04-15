import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as  VideojuegosActions from '../actions/videojuegos.actions';
//import { crearVideojuego, errorCrearVideojuego, videojuegoCreado} from '../actions/videojuegos.actions';
import { VideojuegosService } from '../../features/videojuegos/services/videojuegos.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable()
export class VideojuegosEffects {
  private actions$ = inject(Actions);
  private videojuegosService = inject(VideojuegosService);

  cargarVideojuegos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(VideojuegosActions.cargarVideojuegos),
      mergeMap(() =>
        this.videojuegosService.obtenerVideojuegos().pipe(
          map(videojuegos => 
            VideojuegosActions.videojuegosCargados({ videojuegos })
          ),
          catchError(error => 
            of(VideojuegosActions.errorCargarVideojuegos({ error: error.message }))
          )
        )
      )
    )
  );

  
  private router = inject(Router);

  crearVideojuego$ = createEffect(() => 
    this.actions$.pipe(
      ofType(VideojuegosActions.crearVideojuego),
      mergeMap(({ videojuego }) => 
        this.videojuegosService.crearVideojuego(videojuego).pipe(
          map(videojuegoRespuesta => {
            this.router.navigate(['/main/videojuegos']); // Navegar aquí
            return VideojuegosActions.videojuegoCreado({ 
              videojuego: videojuegoRespuesta 
            });
          }),
          catchError(error => of(VideojuegosActions.errorCrearVideojuego({ 
            error: error.message 
          })))
        )
      )
    )
  );

  actualizarVideojuego$ = createEffect(() => 
    this.actions$.pipe(
      ofType(VideojuegosActions.actualizarVideojuego),
      mergeMap(({ id, videojuego }) => 
        this.videojuegosService.actualizarVideojuego(id, videojuego).pipe(
          map(videojuegoActualizado => 
            VideojuegosActions.videojuegoActualizado({ videojuego: videojuegoActualizado })
          ),
          catchError(error => 
            of(VideojuegosActions.errorActualizarVideojuego({ error: error.message }))
          )
        )
      )
    )
  );

  eliminarVideojuego$ = createEffect(() => 
    this.actions$.pipe(
      ofType(VideojuegosActions.eliminarVideojuego),
      mergeMap(({ id }) => 
        this.videojuegosService.eliminarVideojuego(id).pipe(
          map(() => 
            VideojuegosActions.videojuegoEliminado({ id })
          ),
          catchError(error => 
            of(VideojuegosActions.errorEliminarVideojuego({ error: error.message }))
          )
        )
      )
    )
  );

}