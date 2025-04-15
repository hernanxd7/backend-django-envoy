import { createAction, props } from '@ngrx/store';
import { Transporte } from '../models/Transporte';

// Load Transportes
export const loadTransportes = createAction('[Transportes] Load Transportes');
export const loadTransportesSuccess = createAction(
  '[Transportes] Load Transportes Success',
  props<{ transportes: Transporte[] }>()
);
export const loadTransportesFailure = createAction(
  '[Transportes] Load Transportes Failure',
  props<{ error: string }>()
);

// Load Transporte by ID
export const loadTransporte = createAction(
  '[Transportes] Load Transporte by ID',
  props<{ transporteId: number }>()
);
export const loadTransporteSuccess = createAction(
  '[Transportes] Load Transporte by ID Success',
  props<{ transporte: Transporte }>()
)

// Create Transporte
export const createTransporte = createAction(
  '[Transportes] Create Transporte',
  props<{ transporte: Transporte }>()
);
export const createTransporteSuccess = createAction(
  '[Transportes] Create Transporte Success',
  props<{ transporte: Transporte }>()
);
export const createTransporteFailure = createAction(
  '[Transportes] Create Transporte Failure',
  props<{ error: string }>()
);

// Update Transporte
export const updateTransporte = createAction(
  '[Transportes] Update Transporte',
  props<{ transporte: Transporte }>()
);
export const updateTransporteSuccess = createAction(
  '[Transportes] Update Transporte Success',
  props<{ transporte: Transporte }>()
);
export const updateTransporteFailure = createAction(
  '[Transportes] Update Transporte Failure',
  props<{ error: string }>()
);

// Delete Transporte
export const deleteTransporte = createAction(
  '[Transportes] Delete Transporte',
  props<{ transporteId: number }>()
);
export const deleteTransporteSuccess = createAction(
  '[Transportes] Delete Transporte Success',
  props<{ transporteId: number }>()
);
export const deleteTransporteFailure = createAction(
  '[Transportes] Delete Transporte Failure',
  props<{ error: string }>()
);