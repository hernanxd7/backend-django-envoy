import { Injectable, inject } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { Videojuego } from '../models/videojuego.model';

// Acción para iniciar la carga
export const cargarVideojuegos = createAction('[Videojuegos] Cargar Videojuegos');

// Acción para éxito (cambiada de "cargarVideojuegosSuccess" a "videojuegosCargados")
export const videojuegosCargados = createAction(
  '[Videojuegos] Videojuegos Cargados',
  props<{ videojuegos: Videojuego[] }>()
);

// Acción para error (cambiada de "cargarVideojuegosError" a "errorCargarVideojuegos")
export const errorCargarVideojuegos = createAction(
  '[Videojuegos] Error al Cargar Videojuegos',
  props<{ error: string }>()
);

// Acciones para crear
export const crearVideojuego = createAction(
  '[Videojuegos] Crear Videojuego',
  props<{ videojuego: Omit<Videojuego, 'id'> }>()
);

// Acción para éxito
export const videojuegoCreado = createAction(
  '[Videojuegos] Videojuego Creado',
  props<{ videojuego: Videojuego }>()
);

// Acción para error
export const errorCrearVideojuego = createAction(
  '[Videojuegos] Error al Crear Videojuego',
  props<{ error: string }>()
);

// Acciones para actualizar
export const actualizarVideojuego = createAction(
  '[Videojuegos] Actualizar Videojuego',
  props<{ id: number, videojuego: Videojuego }>()
);
export const videojuegoActualizado = createAction(
  '[Videojuegos] Videojuego Actualizado',
  props<{ videojuego: Videojuego }>()
);
export const errorActualizarVideojuego = createAction(
  '[Videojuegos] Error al Actualizar Videojuego',
  props<{ error: string }>()
);

// Acciones para eliminar
export const eliminarVideojuego = createAction(
  '[Videojuegos] Eliminar Videojuego',
  props<{ id: number }>()
);
export const videojuegoEliminado = createAction(
  '[Videojuegos] Videojuego Eliminado',
  props<{ id: number }>()
);
export const errorEliminarVideojuego = createAction(
  '[Videojuegos] Error al Eliminar Videojuego',
  props<{ error: string }>()
);