import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VendedorState } from '../states/vendedor.state';

export const selectVendedorState = createFeatureSelector<VendedorState>('vendedores');

export const selectVendedores = createSelector(
  selectVendedorState,
  (state) => state.vendedores
);

export const selectLoading = createSelector(
  selectVendedorState,
  (state) => state.loading
);

export const selectLoaded = createSelector(
  selectVendedorState,
  (state) => state.loaded
);

export const selectError = createSelector(
  selectVendedorState,
  (state) => state.error
);