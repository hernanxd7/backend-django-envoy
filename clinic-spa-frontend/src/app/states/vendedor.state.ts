import { Vendedor } from '../models/Vendedor';

export interface VendedorState {
  vendedores: Vendedor[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialVendedorState: VendedorState = {
  vendedores: [],
  loading: false,
  loaded: false,
  error: null
};