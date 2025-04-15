import { Carga } from '../models/Carga';

export interface CargaState {
  cargas: Carga[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialCargaState: CargaState = {
  cargas: [],
  loading: false,
  loaded: false,
  error: null
};