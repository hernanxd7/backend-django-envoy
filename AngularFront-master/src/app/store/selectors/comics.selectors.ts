import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ComicsState } from '../reducers/comics.reducers';

export const seleccionarEstadoComics = createFeatureSelector<ComicsState>('comics');

export const seleccionarComics = createSelector(
    seleccionarEstadoComics,
  (estado) => estado.lista
);

export const seleccionarCargando = createSelector(
    seleccionarEstadoComics,
  (estado) => estado.cargando
);

export const seleccionarError = createSelector(
    seleccionarEstadoComics,
  (estado) => estado.error
);

// Permite obtner información del store que ya este cargado
export const seleccionarComicsCargados = createSelector(
    seleccionarEstadoComics,
    (estado) => estado.cargados
);