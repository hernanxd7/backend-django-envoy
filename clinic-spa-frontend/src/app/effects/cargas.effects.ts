import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import * as CargasActions from "../actions/cargas.actions";
import { Carga } from "../models/Carga";
import { CargasService } from '../services/cargas.service';

@Injectable()
export class CargasEffects {
  private actions$: Actions = inject(Actions);
  private cargasService: CargasService = inject(CargasService);

  loadCargas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargasActions.loadCargas),
      exhaustMap(() => this.cargasService.getCargas().pipe(
        map((cargas: Carga[]) => CargasActions.loadCargasSuccess({ cargas })),
        catchError((error) => of(CargasActions.loadCargasFailure({ error })))
      ))
    )
  );

  createCarga$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargasActions.createCarga),
      exhaustMap((action) => this.cargasService.createCarga(action.carga).pipe(
        map((carga: Carga) => CargasActions.createCargaSuccess({ carga })),
        catchError((error) => of(CargasActions.createCargaFailure({ error })))
      ))
    )
  );

  updateCarga$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargasActions.updateCarga),
      exhaustMap((action) => this.cargasService.updateCarga(action.carga).pipe(
        map((carga: Carga) => CargasActions.updateCargaSuccess({ carga })),
        catchError((error) => of(CargasActions.updateCargaFailure({ error })))
      ))
    )
  );

  deleteCarga$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CargasActions.deleteCarga),
      exhaustMap((action) => this.cargasService.deleteCarga(action.cargaId).pipe(
        map(() => CargasActions.deleteCargaSuccess({ cargaId: action.cargaId })),
        catchError((error) => of(CargasActions.deleteCargaFailure({ error })))
      ))
    )
  );
}