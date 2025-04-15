import { createAction, props } from '@ngrx/store';
import { Carga } from '../models/Carga';

// Load Cargas
export const loadCargas = createAction('[Cargas] Load Cargas');
export const loadCargasSuccess = createAction(
  '[Cargas] Load Cargas Success',
  props<{ cargas: Carga[] }>()
);
export const loadCargasFailure = createAction(
  '[Cargas] Load Cargas Failure',
  props<{ error: string }>()
);

// Load Carga by ID
export const loadCarga = createAction(
  '[Cargas] Load Carga by ID',
  props<{ cargaId: number }>()
);
export const loadCargaSuccess = createAction(
  '[Cargas] Load Carga by ID Success',
  props<{ carga: Carga }>()
);

// Create Carga
export const createCarga = createAction(
  '[Cargas] Create Carga',
  props<{ carga: Partial<Omit<Carga, 'id'>> }>()
);
export const createCargaSuccess = createAction(
  '[Cargas] Create Carga Success',
  props<{ carga: Carga }>()
);
export const createCargaFailure = createAction(
  '[Cargas] Create Carga Failure',
  props<{ error: string }>()
);

// Update Carga
export const updateCarga = createAction(
  '[Cargas] Update Carga',
  props<{ carga: Carga }>()
);
export const updateCargaSuccess = createAction(
  '[Cargas] Update Carga Success',
  props<{ carga: Carga }>()
);
export const updateCargaFailure = createAction(
  '[Cargas] Update Carga Failure',
  props<{ error: string }>()
);

// Delete Carga
export const deleteCarga = createAction(
  '[Cargas] Delete Carga',
  props<{ cargaId: number }>()
);
export const deleteCargaSuccess = createAction(
  '[Cargas] Delete Carga Success',
  props<{ cargaId: number }>()
);
export const deleteCargaFailure = createAction(
  '[Cargas] Delete Carga Failure',
  props<{ error: string }>()
);