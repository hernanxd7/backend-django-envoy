import { createAction, props } from '@ngrx/store';
import { Conductor } from '../models/Conductor';

// Load Conductores
export const loadConductores = createAction('[Conductores] Load Conductores');
export const loadConductoresSuccess = createAction(
  '[Conductores] Load Conductores Success',
  props<{ conductores: Conductor[] }>()
);
export const loadConductoresFailure = createAction(
  '[Conductores] Load Conductores Failure',
  props<{ error: string }>()
);

// Load Conductor by ID
export const loadConductor = createAction(
  '[Conductores] Load Conductor by ID',
  props<{ conductorId: number }>()
);
export const loadConductorSuccess = createAction(
  '[Conductores] Load Conductor by ID Success',
  props<{ conductor: Conductor }>()
  
)

// Create Conductor
export const createConductor = createAction(
  '[Conductores] Create Conductor',
  props<{ conductor: Conductor }>()
);
export const createConductorSuccess = createAction(
  '[Conductores] Create Conductor Success',
  props<{ conductor: Conductor }>()
);
export const createConductorFailure = createAction(
  '[Conductores] Create Conductor Failure',
  props<{ error: string }>()
);

// Update Conductor
export const updateConductor = createAction(
  '[Conductores] Update Conductor',
  props<{ conductor: Conductor }>()
);
export const updateConductorSuccess = createAction(
  '[Conductores] Update Conductor Success',
  props<{ conductor: Conductor }>()
);
export const updateConductorFailure = createAction(
  '[Conductores] Update Conductor Failure',
  props<{ error: string }>()
);

// Delete Conductor
export const deleteConductor = createAction(
  '[Conductores] Delete Conductor',
  props<{ conductorId: number }>()
);
export const deleteConductorSuccess = createAction(
  '[Conductores] Delete Conductor Success',
  props<{ conductorId: number }>()
);
export const deleteConductorFailure = createAction(
  '[Conductores] Delete Conductor Failure',
  props<{ error: string }>()
);