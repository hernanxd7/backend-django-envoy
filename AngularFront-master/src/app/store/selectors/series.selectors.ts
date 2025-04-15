import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeriesState } from '../reducers/series.reducers';

export const seleccionarEstadoSeries = createFeatureSelector<SeriesState>('series');

export const seleccionarSeries = createSelector(
  seleccionarEstadoSeries,
  (estado) => estado.lista
);

export const seleccionarCargando = createSelector(
  seleccionarEstadoSeries,
  (estado) => estado.cargando
);

export const seleccionarError = createSelector(
  seleccionarEstadoSeries,
  (estado) => estado.error
);

// Permite obtner información del store que ya este cargado
export const seleccionarSeriesCargados = createSelector(
    seleccionarEstadoSeries,
    (estado) => estado.cargados
);