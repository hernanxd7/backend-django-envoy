import { ActionReducerMap } from '@ngrx/store';
import { videojuegosReducer, VideojuegosState } from './videojuegos.reducer';
import { peliculasReducer, PeliculasState } from './peliculas.reducers';

export interface AppState {
  videojuegos: VideojuegosState;
  peliculas: PeliculasState;
}

export const appReducers: ActionReducerMap<AppState> = {
  videojuegos: videojuegosReducer,
  peliculas: peliculasReducer
};