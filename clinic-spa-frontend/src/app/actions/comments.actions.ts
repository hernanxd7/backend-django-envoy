import { createAction, props } from '@ngrx/store';
import { Comment } from '../models/comment.model';

export const loadComments = createAction('[Comments] Load Comments');
export const loadCommentsSuccess = createAction(
  '[Comments] Load Comments Success',
  props<{ comments: Comment[] }>()
);
export const loadCommentsFailure = createAction(
  '[Comments] Load Comments Failure',
  props<{ error: string }>()
);