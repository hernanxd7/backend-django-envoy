import { createAction, props } from '@ngrx/store';
import { Pelicula } from '../models/pelicula.model';

export const cargarPeliculas = createAction('[Peliculas] Cargar Películas');

export const peliculasCargadas = createAction(
  '[Peliculas] Películas Cargadas',
  props<{ peliculas: Pelicula[] }>()
);

export const errorCargarPeliculas = createAction(
  '[Peliculas] Error al Cargar Películas',
  props<{ error: string }>()
);

// Acciones para crear
export const crearPelicula = createAction(
  '[Peliculas] Crear Pelicula',
  props<{ pelicula: Omit<Pelicula, 'id'> }>()
);

// Acción para éxito
export const peliculaCreado = createAction(
  '[Peliculas] Pelicula Creado',
  props<{ pelicula: Pelicula }>()
);

// Acción para error
export const errorCrearPelicula = createAction(
  '[Peliculas] Error al Crear Pelicula',
  props<{ error: string }>()
);

// Acciones para actualizar
export const actualizarPelicula = createAction(
  '[Peliculas] Actualizar Pelicula',
  props<{ id: number, pelicula: Pelicula }>()
);
export const peliculaActualizado = createAction(
  '[Peliculas] Pelicula Actualizado',
  props<{ pelicula: Pelicula }>()
);
export const errorActualizarPelicula = createAction(
  '[Peliculas] Error al Actualizar Pelicula',
  props<{ error: string }>()
);

// Acciones para eliminar
export const eliminarPelicula = createAction(
  '[Peliculas] Eliminar Pelicula',
  props<{ id: number }>()
);
export const peliculaEliminado = createAction(
  '[Peliculas] Pelicula Eliminado',
  props<{ id: number }>()
);
export const errorEliminarPelicula = createAction(
  '[Peliculas] Error al Eliminar Pelicula',
  props<{ error: string }>()
);