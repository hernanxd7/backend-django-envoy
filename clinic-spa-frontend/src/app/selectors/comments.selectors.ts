import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState } from '../states/comments.state';

export const selectCommentsState = createFeatureSelector<CommentsState>('comments');

export const selectAllComments = createSelector(
  selectCommentsState,
  (state) => state.comments
);

export const selectCommentsLoading = createSelector(
  selectCommentsState,
  (state) => state.loading
);

export const selectCommentsError = createSelector(
  selectCommentsState,
  (state) => state.error
);
export const selectCommentsLoaded = createSelector(
  selectCommentsState,
  (state) => state.loaded
);
