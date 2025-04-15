import { Citation } from '../models/citation.model';

export interface CitationsState {
  citations: Citation[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialCitationsState: CitationsState = {
  citations: [],
  loading: false,
  loaded: false,
  error: null
};