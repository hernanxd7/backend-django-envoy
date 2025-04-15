import { ActionReducerMap } from '@ngrx/store';
import { videojuegosReducer, VideojuegosState } from '../store/reducers/videojuegos.reducer'; // Cambiado de State a VideojuegosState
import { peliculasReducer, PeliculasState } from './reducers/peliculas.reducers';
import { seriesReducer, SeriesState } from './reducers/series.reducers';
import { comicsReducer, ComicsState } from './reducers/comics.reducers';

export interface AppState {
  videojuegos: VideojuegosState;
  peliculas: PeliculasState;
  series: SeriesState;
  comics: ComicsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  videojuegos: videojuegosReducer,
  peliculas: peliculasReducer,
  series: seriesReducer,
  comics: comicsReducer
  // Añadir otros reducers aquí
};