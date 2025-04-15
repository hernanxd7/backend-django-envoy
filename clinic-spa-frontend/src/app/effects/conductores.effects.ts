import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as ConductoresActions from '../actions/conductores.actions';
import { ConductoresService } from '../services/conductores.service';

@Injectable()
export class ConductoresEffects {
  private actions$ = inject(Actions);
  private conductoresService = inject(ConductoresService);

  loadConductores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConductoresActions.loadConductores),
      exhaustMap(() => this.conductoresService.getConductores().pipe(
        map((conductores) => ConductoresActions.loadConductoresSuccess({ conductores })),
        catchError((error) => of(ConductoresActions.loadConductoresFailure({ error: error.message })))
      ))
    )
  );

  loadConductor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConductoresActions.loadConductor),
      exhaustMap(({ conductorId }) => this.conductoresService.getConductorById(conductorId).pipe(
        map((conductor) => ConductoresActions.loadConductorSuccess({ conductor })),
        catchError((error) => of(ConductoresActions.loadConductoresFailure({ error: error.message })))
      ))
    )
  );

  createConductor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConductoresActions.createConductor),
      exhaustMap(({ conductor }) => this.conductoresService.createConductor(conductor).pipe(
        map((newConductor) => ConductoresActions.createConductorSuccess({ conductor: newConductor })),
        catchError((error) => of(ConductoresActions.createConductorFailure({ error: error.message })))
      ))
    )
  );

  updateConductor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConductoresActions.updateConductor),
      exhaustMap(({ conductor }) => this.conductoresService.updateConductor(conductor).pipe(
        map((updatedConductor) => ConductoresActions.updateConductorSuccess({ conductor: updatedConductor })),
        catchError((error) => of(ConductoresActions.updateConductorFailure({ error: error.message })))
      ))
    )
  );

  deleteConductor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConductoresActions.deleteConductor),
      exhaustMap(({ conductorId }) => this.conductoresService.deleteConductor(conductorId).pipe(
        map(() => ConductoresActions.deleteConductorSuccess({ conductorId })),
        catchError((error) => of(ConductoresActions.deleteConductorFailure({ error: error.message })))
      ))
    )
  );
}