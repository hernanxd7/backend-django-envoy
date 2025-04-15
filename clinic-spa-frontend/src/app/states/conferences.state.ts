import { Conference } from '../models/conference.model';

export interface ConferencesState {
  conferences: Conference[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialConferencesState: ConferencesState = {
  conferences: [],
  loading: false,
  loaded: false,
  error: null
};