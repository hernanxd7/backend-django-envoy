import { Injectable, inject } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { Comic } from '../models/comic.model';

// Acción para iniciar la carga
export const cargarComics = createAction('[Comics] Cargar Comics');

// Acción para éxito (cambiada de "cargarVideojuegosSuccess" a "videojuegosCargados")
export const comicsCargados = createAction(
  '[Comics] Comics Cargados',
  props<{ comics: Comic[] }>()  // Asegúrate de que "videojuegos" esté bien escrito
);

// Acción para error
export const errorCargarComics = createAction(
  '[Comics] Error al Cargar Comics',
  props<{ error: string }>()
);

// Acciones para crear
export const crearComic = createAction(
  '[Comics] Crear Comic',
  props<{ comic: Omit<Comic, 'id'> }>()
);

// Acción para éxito
export const comicCreado = createAction(
  '[Comics] Comic Creado',
  props<{ comic: Comic }>()
);

// Acción para error
export const errorCrearComic = createAction(
  '[Comics] Error al Crear Comic',
  props<{ error: string }>()
);

// Acciones para actualizar
export const actualizarComic = createAction(
  '[Comics] Actualizar Comic',
  props<{ id: number, comic: Comic }>()
);
export const comicActualizado = createAction(
  '[Comics] Comic Actualizado',
  props<{ comic: Comic }>()
);
export const errorActualizarComic = createAction(
  '[Comics] Error al Actualizar Comic',
  props<{ error: string }>()
);

// Acciones para eliminar
export const eliminarComic = createAction(
  '[Comics] Eliminar Comic',
  props<{ id: number }>()
);
export const comicEliminado = createAction(
  '[Comics] Comic Eliminado',
  props<{ id: number }>()
);
export const errorEliminarComic = createAction(
  '[Comics] Error al Eliminar Comic',
  props<{ error: string }>()
);