import { createReducer, on } from "@ngrx/store";
import * as PaperActions from '../actions/papers.actions';
import { initialPaperState } from '../states/paper.state';


export const papersReducer = createReducer(
  initialPaperState,
  on(PaperActions.loadPapersSuccess, (state, action) => ({
    ...state,
    papers: action.papers,
    loading: false,
    loaded: true,
  })),
  on(PaperActions.loadPapersFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),


  on(PaperActions.createPaper, (state, action) => ({
   ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(PaperActions.createPaperSuccess, (state, { paper }) => ({
    ...state,
    papers: [...state.papers, paper],
    loading: false,
    loaded: true,
  })),
  on(PaperActions.createPaperFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  })),

  on(PaperActions.updatePaper, (state) => ({
    ...state,
    loading: true,
    error: null,  // Resetear error
  })),

  on(PaperActions.updatePaperSuccess, (state, action) => ({
    ...state,
    papers: state.papers.map(paper => 
      paper.id === action.paper.id ? action.paper : paper
    ),
    loading: false,
    loaded: true,
  })),
  on(PaperActions.updatePaperFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error,
  })),


  on(PaperActions.deletePaper, (state) => ({
   ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(PaperActions.deletePaperSuccess, (state, { paperId }) => ({
    ...state,
    papers: state.papers.filter(paper => paper.id !== paperId),
    loading: false,
    loaded: true,
  })),
  on(PaperActions.deletePaperFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
  }))
);