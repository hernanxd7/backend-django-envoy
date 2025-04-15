import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PaperState } from '../states/paper.state';

export const selectPaperState = createFeatureSelector<PaperState>('papers');

export const selectPapers = createSelector(
  selectPaperState,
  (state) => state.papers
);

export const selectLoading = createSelector(
  selectPaperState,
  (state) => state.loading
)

export const selectLoaded = createSelector(
  selectPaperState,
  (state) => state.loaded
)

export const selectError = createSelector(
  selectPaperState,
  (state) => state.error
)