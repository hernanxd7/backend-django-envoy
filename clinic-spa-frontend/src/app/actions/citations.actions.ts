import { createAction, props } from '@ngrx/store';
import { Citation } from '../models/citation.model';

export const loadCitations = createAction('[Citations] Load Citations');
export const loadCitationsSuccess = createAction(
  '[Citations] Load Citations Success',
  props<{ citations: Citation[] }>()
);
export const loadCitationsFailure = createAction(
  '[Citations] Load Citations Failure',
  props<{ error: string }>()
);