import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SeriesActions from '../actions/series.actions';
import { SeriesService } from '../../features/series/services/series.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class SeriesEffects {
  private actions$ = inject(Actions);
  private seriesService = inject(SeriesService);

  cargarSeries$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SeriesActions.cargarSeries),
      mergeMap(() =>
        this.seriesService.obtenerSeries().pipe(
          map(series => 
            SeriesActions.seriesCargados({ series })
          ),
          catchError(error => 
            of(SeriesActions.errorCargarSeries({ error: error.message }))
          )
        )
      )
    )
  );
  
    private router = inject(Router);
    
    crearSerie$ = createEffect(() => 
      this.actions$.pipe(
        ofType(SeriesActions.crearSerie),
        mergeMap(({ serie }) => 
          this.seriesService.crearSerie(serie).pipe(
            map(serieRespuesta => {
              this.router.navigate(['/main/series']); // Navegar aquí
              return SeriesActions.serieCreado({ 
                serie: serieRespuesta 
              });
            }),
            catchError(error => of(SeriesActions.errorCrearSerie({ 
              error: error.message 
            })))
          )
        )
      )
    );
    
    actualizarSerie$ = createEffect(() => 
      this.actions$.pipe(
        ofType(SeriesActions.actualizarSerie),
        mergeMap(({ id, serie }) => 
          this.seriesService.actualizarSerie(id, serie).pipe(
            map(serieActualizado => 
              SeriesActions.serieActualizado({ serie: serieActualizado })
            ),
            catchError(error => 
              of(SeriesActions.errorActualizarSerie({ error: error.message }))
            )
          )
        )
      )
    );
  
    eliminarSerie$ = createEffect(() => 
      this.actions$.pipe(
        ofType(SeriesActions.eliminarSerie),
        mergeMap(({ id }) => 
          this.seriesService.eliminarSerie(id).pipe(
            map(() => 
              SeriesActions.serieEliminado({ id })
            ),
            catchError(error => 
              of(SeriesActions.errorEliminarSerie({ error: error.message }))
            )
          )
        )
      )
    );
  
  
    
  }