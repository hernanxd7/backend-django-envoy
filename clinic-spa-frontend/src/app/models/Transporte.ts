export interface Transporte {
  id: number;
  placa: string;
  modelo: string;
  capacidad: number;
  estado: string;
  fecha_mantenimiento: string;
  conductor_id: number;
  carga_id: number;
}