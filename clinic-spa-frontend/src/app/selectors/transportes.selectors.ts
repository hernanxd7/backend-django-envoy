import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TransporteState } from '../states/transporte.state';

export const selectTransporteState = createFeatureSelector<TransporteState>('transportes');

export const selectTransportes = createSelector(
  selectTransporteState,
  (state) => state.transportes
);

export const selectLoading = createSelector(
  selectTransporteState,
  (state) => state.loading
);

export const selectLoaded = createSelector(
  selectTransporteState,
  (state) => state.loaded
);

export const selectError = createSelector(
  selectTransporteState,
  (state) => state.error
);