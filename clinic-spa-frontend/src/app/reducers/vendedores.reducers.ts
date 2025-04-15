import { createReducer, on } from "@ngrx/store";
import * as VendedorActions from '../actions/vendedores.actions';
import { initialVendedorState } from '../states/vendedor.state';

export const vendedoresReducer = createReducer(
  initialVendedorState,
  on(VendedorActions.loadVendedoresSuccess, (state, action) => ({
    ...state,
    vendedores: action.vendedores,
    loading: false,
    loaded: true,
  })),
  on(VendedorActions.loadVendedoresFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(VendedorActions.createVendedor, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(VendedorActions.createVendedorSuccess, (state, { vendedor }) => ({
    ...state,
    vendedores: [...state.vendedores, vendedor],
    loading: false,
    loaded: true,
  })),
  on(VendedorActions.createVendedorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  })),

  on(VendedorActions.updateVendedor, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendedorActions.updateVendedorSuccess, (state, action) => ({
    ...state,
    vendedores: state.vendedores.map(vendedor => 
      vendedor.id === action.vendedor.id ? action.vendedor : vendedor
    ),
    loading: false,
    loaded: true,
  })),
  on(VendedorActions.updateVendedorFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(VendedorActions.deleteVendedor, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(VendedorActions.deleteVendedorSuccess, (state, { vendedorId }) => ({
    ...state,
    vendedores: state.vendedores.filter(vendedor => vendedor.id !== vendedorId),
    loading: false,
    loaded: true,
  })),
  on(VendedorActions.deleteVendedorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  }))
);