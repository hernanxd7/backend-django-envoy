import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import * as TransportesActions from "../actions/transportes.actions";
import { Transporte } from "../models/Transporte";
import { TransportesService } from '../services/transportes.service';

@Injectable()
export class TransportesEffects {
  private actions$: Actions = inject(Actions);
  private transportesService: TransportesService = inject(TransportesService);

  loadTransportes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportesActions.loadTransportes),
      exhaustMap(() => this.transportesService.getTransportes().pipe(
        map((transportes: Transporte[]) => TransportesActions.loadTransportesSuccess({ transportes })),
        catchError((error) => of(TransportesActions.loadTransportesFailure({ error })))
      ))
    )
  );

  createTransporte$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportesActions.createTransporte),
      exhaustMap((action) => this.transportesService.createTransporte(action.transporte).pipe(
        map((transporte: Transporte) => TransportesActions.createTransporteSuccess({ transporte })),
        catchError((error) => of(TransportesActions.createTransporteFailure({ error })))
      ))
    )
  );

  updateTransporte$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportesActions.updateTransporte),
      exhaustMap((action) => this.transportesService.updateTransporte(action.transporte).pipe(
        map((transporte: Transporte) => TransportesActions.updateTransporteSuccess({ transporte })),
        catchError((error) => of(TransportesActions.updateTransporteFailure({ error })))
      ))
    )
  );

  deleteTransporte$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportesActions.deleteTransporte),
      exhaustMap((action) => this.transportesService.deleteTransporte(action.transporteId).pipe(
        map(() => TransportesActions.deleteTransporteSuccess({ transporteId: action.transporteId })),
        catchError((error) => of(TransportesActions.deleteTransporteFailure({ error })))
      ))
    )
  );
}