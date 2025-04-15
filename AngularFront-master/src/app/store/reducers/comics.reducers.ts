import { createReducer, on } from '@ngrx/store';
import { Comic } from '../models/comic.model';
import * as ComicsActions from '../actions/comics.actions';
import { crearComic, comicCreado, errorCrearComic} from '../actions/comics.actions';

export interface ComicsState {
  lista: Comic[];
  cargando: boolean;
  error: string | null;
  cargados: boolean; // Manejo de store
}

export const initialState: ComicsState = {
  lista: [],
  cargando: false,
  error: null,
  cargados: false // Manejo de store
};

export const comicsReducer = createReducer(
  initialState,
  on(ComicsActions.cargarComics, (state) => ({
    ...state,
    cargando: true,
    error: null
  })),
  on(ComicsActions.comicsCargados, (state, { comics }) => ({
    ...state,
    lista: comics,
    cargando: false,
    cargados: true // Manejo de store
  })),
  on(ComicsActions.errorCargarComics, (state, { error }) => ({
    ...state,
    cargando: false,
    error,
    cargados: false // Manejo de error en caso de que no se cargue el store
  })),
    
    // Crear
    on(ComicsActions.crearComic, (state) => ({
      ...state,
      cargando: true
    })),
    on(ComicsActions.comicCreado, (state, { comic }) => ({
      ...state,
      lista: [...state.lista, comic],
      cargando: false,
      cargados: true
    })),
    on(ComicsActions.errorCrearComic, (state, { error }) => ({
      ...state,
      cargando: false,
      error
    })),
    
    // Actualizar
    on(ComicsActions.actualizarComic, (state) => ({
      ...state,
      cargando: true
    })),
    on(ComicsActions.comicActualizado, (state, { comic }) => ({
      ...state,
      lista: state.lista.map(item => 
        item.id === comic.id ? comic : item
      ),
      cargando: false
    })),
    on(ComicsActions.errorActualizarComic, (state, { error }) => ({
      ...state,
      cargando: false,
      error
    })),
    
    // Eliminar
    on(ComicsActions.eliminarComic, (state) => ({
      ...state,
      cargando: true
    })),
    on(ComicsActions.comicEliminado, (state, { id }) => ({
      ...state,
      lista: state.lista.filter(item => item.id !== id),
      cargando: false
    })),
    on(ComicsActions.errorEliminarComic, (state, { error }) => ({
      ...state,
      cargando: false,
      error
    }))
);