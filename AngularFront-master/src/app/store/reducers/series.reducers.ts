import { createReducer, on } from '@ngrx/store';
import { Serie } from '../models/serie.model';
import * as SeriesActions from '../actions/series.actions';

export interface SeriesState {
  lista: Serie[];
  cargando: boolean;
  error: string | null;
  cargados: boolean; // Manejo de store
}

export const initialState: SeriesState = {
  lista: [],
  cargando: false,
  error: null,
  cargados: false // Manejo de store
};

export const seriesReducer = createReducer(
  initialState,
  on(SeriesActions.cargarSeries, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(SeriesActions.seriesCargados, (state, { series }) => ({
    ...state,
    lista: series,
    cargando: false,
    cargados: true // Manejo de store
  })),
  on(SeriesActions.errorCargarSeries, (state, { error }) => ({
    ...state,
    cargando: false,
    error,
    cargados: false // Manejo de error en caso de que no se cargue el store
  })),
      
      // Crear
      on(SeriesActions.crearSerie, (state) => ({
        ...state,
        cargando: true
      })),
      on(SeriesActions.serieCreado, (state, { serie }) => ({
        ...state,
        lista: [...state.lista, serie],
        cargando: false,
        cargados: true
      })),
      on(SeriesActions.errorCrearSerie, (state, { error }) => ({
        ...state,
        cargando: false,
        error
      })),
      
      // Actualizar
      on(SeriesActions.actualizarSerie, (state) => ({
        ...state,
        cargando: true
      })),
      on(SeriesActions.serieActualizado, (state, { serie }) => ({
        ...state,
        lista: state.lista.map(item => 
          item.id === serie.id ? serie : item
        ),
        cargando: false
      })),
      on(SeriesActions.errorActualizarSerie, (state, { error }) => ({
        ...state,
        cargando: false,
        error
      })),
      
      // Eliminar
      on(SeriesActions.eliminarSerie, (state) => ({
        ...state,
        cargando: true
      })),
      on(SeriesActions.serieEliminado, (state, { id }) => ({
        ...state,
        lista: state.lista.filter(item => item.id !== id),
        cargando: false
      })),
      on(SeriesActions.errorEliminarSerie, (state, { error }) => ({
        ...state,
        cargando: false,
        error
      }))
  );