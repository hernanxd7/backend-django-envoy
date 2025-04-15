import { Journal } from '../models/journal.model';

export interface JournalsState {
  journals: Journal[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialJournalsState: JournalsState = {
  journals: [],
  loading: false,
  loaded: false,
  error: null
};