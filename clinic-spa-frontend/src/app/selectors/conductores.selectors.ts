import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConductorState } from '../states/conductor.state';

export const selectConductorState = createFeatureSelector<ConductorState>('conductores');

export const selectConductores = createSelector(
  selectConductorState,
  (state) => state.conductores
);

export const selectLoading = createSelector(
  selectConductorState,
  (state) => state.loading
);

export const selectLoaded = createSelector(
  selectConductorState,
  (state) => state.loaded
);

export const selectError = createSelector(
  selectConductorState,
  (state) => state.error
);