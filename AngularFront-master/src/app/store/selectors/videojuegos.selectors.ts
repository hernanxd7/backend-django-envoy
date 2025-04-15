import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideojuegosState } from '../reducers/videojuegos.reducer';

export const seleccionarEstadoVideojuegos = createFeatureSelector<VideojuegosState>('videojuegos');

export const seleccionarVideojuegos = createSelector(
  seleccionarEstadoVideojuegos,
  (estado) => estado.lista
);

export const seleccionarCargando = createSelector(
  seleccionarEstadoVideojuegos,
  (estado) => estado.cargando
);

export const seleccionarError = createSelector(
  seleccionarEstadoVideojuegos,
  (estado) => estado.error
);

// Permite obtner información del store que ya este cargado
export const seleccionarVideojuegosCargados = createSelector(
    seleccionarEstadoVideojuegos,
    (estado) => estado.cargados
);