import { createReducer, on } from "@ngrx/store";
import * as CargaActions from '../actions/cargas.actions';
import { initialCargaState } from '../states/carga.state';

export const cargasReducer = createReducer(
  initialCargaState,
  on(CargaActions.loadCargasSuccess, (state, action) => ({
    ...state,
    cargas: action.cargas,
    loading: false,
    loaded: true,
  })),
  on(CargaActions.loadCargasFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(CargaActions.createCarga, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(CargaActions.createCargaSuccess, (state, { carga }) => ({
    ...state,
    cargas: [...state.cargas, carga],
    loading: false,
    loaded: true,
  })),
  on(CargaActions.createCargaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  })),

  on(CargaActions.updateCarga, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CargaActions.updateCargaSuccess, (state, action) => ({
    ...state,
    cargas: state.cargas.map(carga => 
      carga.id === action.carga.id ? action.carga : carga
    ),
    loading: false,
    loaded: true,
  })),
  on(CargaActions.updateCargaFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(CargaActions.deleteCarga, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(CargaActions.deleteCargaSuccess, (state, { cargaId }) => ({
    ...state,
    cargas: state.cargas.filter(carga => carga.id !== cargaId),
    loading: false,
    loaded: true,
  })),
  on(CargaActions.deleteCargaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  }))
);