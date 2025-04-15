import { Transporte } from '../models/Transporte';

export interface TransporteState {
  transportes: Transporte[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialTransporteState: TransporteState = {
  transportes: [],
  loading: false,
  loaded: false,
  error: null
};