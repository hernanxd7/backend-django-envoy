import { Injectable, inject } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { Serie } from '../models/serie.model';

// Acción para iniciar la carga
export const cargarSeries = createAction('[Series] Cargar Series');

// Acción para éxito (cambiada de "cargarVideojuegosSuccess" a "videojuegosCargados")
export const seriesCargados = createAction(
  '[Series] Series Cargados',
  props<{ series: Serie[] }>()  // Asegúrate de que "videojuegos" esté bien escrito
);

// Acción para error
export const errorCargarSeries = createAction(
  '[Series] Error al Cargar Series',
  props<{ error: string }>()
);

// Acciones para crear
export const crearSerie = createAction(
  '[Series] Crear Serie',
  props<{ serie: Omit<Serie, 'id'> }>()
);

// Acción para éxito
export const serieCreado = createAction(
  '[Series] Serie Creado',
  props<{ serie: Serie }>()
);

// Acción para error
export const errorCrearSerie = createAction(
  '[Series] Error al Crear Serie',
  props<{ error: string }>()
);

// Acciones para actualizar
export const actualizarSerie = createAction(
  '[Series] Actualizar Serie',
  props<{ id: number, serie: Serie }>()
);
export const serieActualizado = createAction(
  '[Series] Serie Actualizado',
  props<{ serie: Serie }>()
);
export const errorActualizarSerie = createAction(
  '[Series] Error al Actualizar Serie',
  props<{ error: string }>()
);

// Acciones para eliminar
export const eliminarSerie = createAction(
  '[Series] Eliminar Serie',
  props<{ id: number }>()
);
export const serieEliminado = createAction(
  '[Series] Serie Eliminado',
  props<{ id: number }>()
);
export const errorEliminarSerie = createAction(
  '[Series] Error al Eliminar Serie',
  props<{ error: string }>()
);