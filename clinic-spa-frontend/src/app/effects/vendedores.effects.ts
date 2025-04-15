import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import * as VendedoresActions from "../actions/vendedores.actions";
import { Vendedor } from "../models/Vendedor";
import { VendedoresService } from '../services/vendedores.service';

@Injectable()
export class VendedoresEffects {
  private actions$: Actions = inject(Actions);
  private vendedoresService: VendedoresService = inject(VendedoresService);

  loadVendedores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendedoresActions.loadVendedores),
      exhaustMap(() => this.vendedoresService.getVendedores().pipe(
        map((vendedores: Vendedor[]) => VendedoresActions.loadVendedoresSuccess({ vendedores })),
        catchError((error) => of(VendedoresActions.loadVendedoresFailure({ error })))
      ))
    )
  );

  createVendedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendedoresActions.createVendedor),
      exhaustMap((action) => this.vendedoresService.createVendedor(action.vendedor).pipe(
        map((vendedor: Vendedor) => VendedoresActions.createVendedorSuccess({ vendedor })),
        catchError((error) => of(VendedoresActions.createVendedorFailure({ error })))
      ))
    )
  );

  updateVendedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendedoresActions.updateVendedor),
      exhaustMap((action) => this.vendedoresService.updateVendedor(action.vendedor).pipe(
        map((vendedor: Vendedor) => VendedoresActions.updateVendedorSuccess({ vendedor })),
        catchError((error) => of(VendedoresActions.updateVendedorFailure({ error })))
      ))
    )
  );

  deleteVendedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendedoresActions.deleteVendedor),
      exhaustMap((action) => this.vendedoresService.deleteVendedor(action.vendedorId).pipe(
        map(() => VendedoresActions.deleteVendedorSuccess({ vendedorId: action.vendedorId })),
        catchError((error) => of(VendedoresActions.deleteVendedorFailure({ error })))
      ))
    )
  );
}