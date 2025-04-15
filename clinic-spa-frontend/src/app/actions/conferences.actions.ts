import { createAction, props } from '@ngrx/store';
import { Conference } from '../models/conference.model';

export const loadConferences = createAction('[Conferences] Load Conferences');
export const loadConferencesSuccess = createAction(
  '[Conferences] Load Conferences Success',
  props<{ conferences: Conference[] }>()
);
export const loadConferencesFailure = createAction(
  '[Conferences] Load Conferences Failure',
  props<{ error: string }>()
);