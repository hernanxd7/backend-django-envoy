import { createAction, props } from '@ngrx/store';
import { Journal } from '../models/journal.model';

export const loadJournals = createAction('[Journals] Load Journals');
export const loadJournalsSuccess = createAction(
  '[Journals] Load Journals Success',
  props<{ journals: Journal[] }>()
);
export const loadJournalsFailure = createAction(
  '[Journals] Load Journals Failure',
  props<{ error: string }>()
);