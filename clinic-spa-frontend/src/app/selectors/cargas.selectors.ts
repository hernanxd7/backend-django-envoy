import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CargaState } from '../states/carga.state';

export const selectCargaState = createFeatureSelector<CargaState>('cargas');

export const selectCargas = createSelector(
  selectCargaState,
  (state) => state.cargas
);

export const selectLoading = createSelector(
  selectCargaState,
  (state) => state.loading
);

export const selectLoaded = createSelector(
  selectCargaState,
  (state) => state.loaded
);

export const selectError = createSelector(
  selectCargaState,
  (state) => state.error
);