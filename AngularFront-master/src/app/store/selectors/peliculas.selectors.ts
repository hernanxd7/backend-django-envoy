import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeliculasState } from '../reducers/peliculas.reducers';

export const seleccionarEstadoPeliculas = createFeatureSelector<PeliculasState>('peliculas');

export const seleccionarPeliculas = createSelector(
  seleccionarEstadoPeliculas,
  (estado) => estado.lista
);

export const seleccionarCargandoPeliculas = createSelector(
  seleccionarEstadoPeliculas,
  (estado) => estado.cargando
);

export const seleccionarErrorPeliculas = createSelector(
  seleccionarEstadoPeliculas,
  (estado) => estado.error
);

// Permite obtner información del store que ya este cargado
export const seleccionarPeliculasCargadas = createSelector(
    seleccionarEstadoPeliculas,
    (estado) => estado.cargadas
);
  