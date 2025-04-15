import { createReducer, on } from "@ngrx/store";
import * as TransporteActions from '../actions/transportes.actions';
import { initialTransporteState } from '../states/transporte.state';

export const transportesReducer = createReducer(
  initialTransporteState,
  on(TransporteActions.loadTransportesSuccess, (state, action) => ({
    ...state,
    transportes: action.transportes,
    loading: false,
    loaded: true,
  })),
  on(TransporteActions.loadTransportesFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(TransporteActions.createTransporte, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TransporteActions.createTransporteSuccess, (state, { transporte }) => ({
    ...state,
    transportes: [...state.transportes, transporte],
    loading: false,
    loaded: true,
  })),
  on(TransporteActions.createTransporteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  })),

  on(TransporteActions.updateTransporte, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TransporteActions.updateTransporteSuccess, (state, action) => ({
    ...state,
    transportes: state.transportes.map(transporte => 
      transporte.id === action.transporte.id ? action.transporte : transporte
    ),
    loading: false,
    loaded: true,
  })),
  on(TransporteActions.updateTransporteFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(TransporteActions.deleteTransporte, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TransporteActions.deleteTransporteSuccess, (state, { transporteId }) => ({
    ...state,
    transportes: state.transportes.filter(transporte => transporte.id !== transporteId),
    loading: false,
    loaded: true,
  })),
  on(TransporteActions.deleteTransporteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  }))
);