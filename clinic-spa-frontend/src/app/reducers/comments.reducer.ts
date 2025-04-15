import { createReducer, on } from '@ngrx/store';
import * as CommentsActions from '../actions/comments.actions';
import { initialCommentsState } from '../states/comments.state';

export const commentsReducer = createReducer(
  initialCommentsState,
  on(CommentsActions.loadComments, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CommentsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
    loading: false,
    loaded: true // Set to true when comments are successfully loaded
  })),
  on(CommentsActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
