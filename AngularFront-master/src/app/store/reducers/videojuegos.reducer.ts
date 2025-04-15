import { createReducer, on } from '@ngrx/store';
import { Videojuego } from '../models/videojuego.model';
import * as VideojuegosActions from '../actions/videojuegos.actions';
import { crearVideojuego, videojuegoCreado, errorCrearVideojuego} from '../actions/videojuegos.actions';

export interface VideojuegosState {
  lista: Videojuego[];
  cargando: boolean;
  error: string | null;
  cargados: boolean; // Manejo de store
}

export const initialState: VideojuegosState = {
  lista: [],
  cargando: false,
  error: null,
  cargados: false // Manejo de store
};

export const videojuegosReducer = createReducer(
  initialState,
  on(VideojuegosActions.cargarVideojuegos, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(VideojuegosActions.videojuegosCargados, (state, { videojuegos }) => ({
    ...state,
    lista: videojuegos,
    cargando: false,
    cargados: true // Manejo de store
  })),
  
  // Crear
  on(VideojuegosActions.crearVideojuego, (state) => ({
    ...state,
    cargando: true
  })),
  on(VideojuegosActions.videojuegoCreado, (state, { videojuego }) => ({
    ...state,
    lista: [...state.lista, videojuego],
    cargando: false,
    cargados: true
  })),
  on(VideojuegosActions.errorCrearVideojuego, (state, { error }) => ({
    ...state,
    cargando: false,
    error
  })),
  
  // Actualizar
  on(VideojuegosActions.actualizarVideojuego, (state) => ({
    ...state,
    cargando: true
  })),
  on(VideojuegosActions.videojuegoActualizado, (state, { videojuego }) => ({
    ...state,
    lista: state.lista.map(item => 
      item.id === videojuego.id ? videojuego : item
    ),
    cargando: false
  })),
  on(VideojuegosActions.errorActualizarVideojuego, (state, { error }) => ({
    ...state,
    cargando: false,
    error
  })),
  
  // Eliminar
  on(VideojuegosActions.eliminarVideojuego, (state) => ({
    ...state,
    cargando: true
  })),
  on(VideojuegosActions.videojuegoEliminado, (state, { id }) => ({
    ...state,
    lista: state.lista.filter(item => item.id !== id),
    cargando: false
  })),
  on(VideojuegosActions.errorEliminarVideojuego, (state, { error }) => ({
    ...state,
    cargando: false,
    error
  }))
);