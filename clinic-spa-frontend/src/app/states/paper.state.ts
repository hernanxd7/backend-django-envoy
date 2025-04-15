import { Paper } from '../models/Paper';

export interface PaperState {
  papers: Paper[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  selectedPaper: Paper | null;
}

export const initialPaperState: PaperState = {
  papers: [],
  loading: false,
  loaded: false,
  error: null,
  selectedPaper: null,
};