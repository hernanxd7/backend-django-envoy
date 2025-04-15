import { Conductor } from '../models/Conductor';

export interface ConductorState {
  conductores: Conductor[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialConductorState: ConductorState = {
  conductores: [],
  loading: false,
  loaded: false,
  error: null
};