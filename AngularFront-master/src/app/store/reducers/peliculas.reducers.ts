import { createReducer, on } from '@ngrx/store';
import { Pelicula } from '../models/pelicula.model';
import * as PeliculasActions from '../actions/peliculas.actions';

export interface PeliculasState {
  lista: Pelicula[];
  cargando: boolean;
  error: string | null;
  cargadas: boolean; // Manejo de store
}

export const initialState: PeliculasState = {
  lista: [],
  cargando: false,
  error: null,
  cargadas: false // Manejo de store
};

export const peliculasReducer = createReducer(
  initialState,
  on(PeliculasActions.cargarPeliculas, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(PeliculasActions.peliculasCargadas, (state, { peliculas }) => ({
    ...state,
    lista: peliculas,
    cargando: false,
    cargadas: true // Manejo de store
  })),
  on(PeliculasActions.errorCargarPeliculas, (state, { error }) => ({
    ...state,
    cargando: false,
    error,
    cargadas: false // Manejo de error en caso de que no se cargue el store
  })),
      
  // Crear
  on(PeliculasActions.crearPelicula, (state) => ({
    ...state,
    cargando: true
  })),
  on(PeliculasActions.peliculaCreado, (state, { pelicula }) => ({
    ...state,
    lista: [...state.lista, pelicula],
    cargando: false,
    cargados: true
  })),
  on(PeliculasActions.errorCrearPelicula, (state, { error }) => ({
    ...state,
    cargando: false,
    error
  })),
  
  // Actualizar
  on(PeliculasActions.actualizarPelicula, (state) => ({
    ...state,
    cargando: true
  })),
  on(PeliculasActions.peliculaActualizado, (state, { pelicula }) => ({
    ...state,
    lista: state.lista.map(item => 
      item.id === pelicula.id ? pelicula : item
    ),
    cargando: false
  })),
  on(PeliculasActions.errorActualizarPelicula, (state, { error }) => ({
    ...state,
    cargando: false,
    error
  })),
  
  // Eliminar
  on(PeliculasActions.eliminarPelicula, (state) => ({
    ...state,
    cargando: true
  })),
  on(PeliculasActions.peliculaEliminado, (state, { id }) => ({
    ...state,
    lista: state.lista.filter(item => item.id !== id),
    cargando: false
  })),
  on(PeliculasActions.errorEliminarPelicula, (state, { error }) => ({
    ...state,
    cargando: false,
    error
  }))
);