import { createReducer, on } from "@ngrx/store";
import * as ConductorActions from '../actions/conductores.actions';
import { initialConductorState } from '../states/conductor.state';

export const conductoresReducer = createReducer(
  initialConductorState,
  on(ConductorActions.loadConductoresSuccess, (state, action) => ({
    ...state,
    conductores: action.conductores,
    loading: false,
    loaded: true,
  })),
  on(ConductorActions.loadConductoresFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(ConductorActions.createConductor, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ConductorActions.createConductorSuccess, (state, { conductor }) => ({
    ...state,
    conductores: [...state.conductores, conductor],
    loading: false,
    loaded: true,
  })),
  on(ConductorActions.createConductorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  })),

  on(ConductorActions.updateConductor, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConductorActions.updateConductorSuccess, (state, action) => ({
    ...state,
    conductores: state.conductores.map(conductor => 
      conductor.id === action.conductor.id ? action.conductor : conductor
    ),
    loading: false,
    loaded: true,
  })),
  on(ConductorActions.updateConductorFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),

  on(ConductorActions.deleteConductor, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ConductorActions.deleteConductorSuccess, (state, { conductorId }) => ({
    ...state,
    conductores: state.conductores.filter(conductor => conductor.id !== conductorId),
    loading: false,
    loaded: true,
  })),
  on(ConductorActions.deleteConductorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  }))
);