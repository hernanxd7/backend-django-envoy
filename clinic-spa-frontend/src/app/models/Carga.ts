export interface Carga {
  id: number;
  descripcion: string;
  peso: number;
  tipo: string;
  fecha_registro: string;
  origen: string;
  destino: string;
  vendedor_id: number;
  // Campos adicionales
  volumen: number;
  fecha_recogida: string;
  fecha_entrega: string;
}