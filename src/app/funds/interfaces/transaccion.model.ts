import { Fondo } from './fondo.model';

export interface Transaccion {
  id: number;
  fondo: Fondo;
  tipo: 'Suscripcion' | 'Cancelacion';
  monto: number;
  fecha: Date;
}
