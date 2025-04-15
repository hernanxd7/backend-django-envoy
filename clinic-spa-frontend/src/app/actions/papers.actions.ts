import { createAction, props } from '@ngrx/store';
import { Paper } from '../models/Paper';

// Load Papers
export const loadPapers = createAction('[Papers] Load Papers');
export const loadPapersSuccess = createAction(
  '[Papers] Load Papers Success',
  props<{ papers: Paper[] }>()
);
export const loadPapersFailure = createAction(
  '[Papers] Load Papers Failure',
  props<{ error: string }>()
);

// Create Paper
export const createPaper = createAction(
  '[Papers] Create Paper',
  props<{ paper: Paper }>()
);
export const createPaperSuccess = createAction(
  '[Papers] Create Paper Success',
  props<{ paper: Paper }>()
);
export const createPaperFailure = createAction(
  '[Papers] Create Paper Failure',
  props<{ error: string }>()
);

// Update Paper
export const updatePaper = createAction(
  '[Papers] Update Paper',
  props<{ paper: Paper }>()
);
export const updatePaperSuccess = createAction(
  '[Papers] Update Paper Success',
  props<{ paper: Paper }>()
);
export const updatePaperFailure = createAction(
  '[Papers] Update Paper Failure',
  props<{ error: string }>()
);

// Delete Paper
export const deletePaper = createAction(
  '[Papers] Delete Paper',
  props<{ paperId: number }>()
);
export const deletePaperSuccess = createAction(
  '[Papers] Delete Paper Success',
  props<{ paperId: number }>()
);
export const deletePaperFailure = createAction(
  '[Papers] Delete Paper Failure',
  props<{ error: string }>()
);
