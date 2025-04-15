import { createAction, props } from '@ngrx/store';
import { Vendedor } from '../models/Vendedor';

// Load Vendedores
export const loadVendedores = createAction('[Vendedores] Load Vendedores');
export const loadVendedoresSuccess = createAction(
  '[Vendedores] Load Vendedores Success',
  props<{ vendedores: Vendedor[] }>()
);
export const loadVendedoresFailure = createAction(
  '[Vendedores] Load Vendedores Failure',
  props<{ error: string }>()
);


// Load Vendedor by ID
export const loadVendedor = createAction(
  '[Vendedores] Load Vendedor by ID',
  props<{ vendedorId: number }>()
);

export const loadVendedorSuccess = createAction(
  '[Vendedores] Load Vendedor by ID Success',
  props<{ vendedor: Vendedor }>()
);

// Create Vendedor
export const createVendedor = createAction(
  '[Vendedores] Create Vendedor',
  props<{ vendedor: Vendedor }>()
);
export const createVendedorSuccess = createAction(
  '[Vendedores] Create Vendedor Success',
  props<{ vendedor: Vendedor }>()
);
export const createVendedorFailure = createAction(
  '[Vendedores] Create Vendedor Failure',
  props<{ error: string }>()
);

// Update Vendedor
export const updateVendedor = createAction(
  '[Vendedores] Update Vendedor',
  props<{ vendedor: Vendedor }>()
);
export const updateVendedorSuccess = createAction(
  '[Vendedores] Update Vendedor Success',
  props<{ vendedor: Vendedor }>()
);
export const updateVendedorFailure = createAction(
  '[Vendedores] Update Vendedor Failure',
  props<{ error: string }>()
);

// Delete Vendedor
export const deleteVendedor = createAction(
  '[Vendedores] Delete Vendedor',
  props<{ vendedorId: number }>()
);
export const deleteVendedorSuccess = createAction(
  '[Vendedores] Delete Vendedor Success',
  props<{ vendedorId: number }>()
);
export const deleteVendedorFailure = createAction(
  '[Vendedores] Delete Vendedor Failure',
  props<{ error: string }>()
);