import { Injectable, signal } from '@angular/core';
import { Fondo } from '../interfaces/fondo.model';
import { Transaccion } from '../interfaces/transaccion.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  saldo = signal(500_000); // saldo inicial
  transacciones = signal<Transaccion[]>([]);
  suscripcionesActivas = signal<Set<number>>(new Set()); //  IDs de fondos suscritos

  suscribirse(fondo: Fondo, monto: number): boolean {
    if (monto < fondo.montoMinimo) return false;
    if (monto > this.saldo()) return false;

    this.saldo.set(this.saldo() - monto);

    // Marcar fondo como suscrito
    const nuevasSuscripciones = new Set(this.suscripcionesActivas());
    nuevasSuscripciones.add(fondo.id);
    this.suscripcionesActivas.set(nuevasSuscripciones);

    const transaccion: Transaccion = {
      id: Date.now(),
      fondo,
      tipo: 'Suscripcion',
      monto,
      fecha: new Date(),
    };
    this.transacciones.update((t) => [...t, transaccion]);

    return true;
  }

  cancelar(fondo: Fondo, monto: number): boolean {
    //  Validar si está suscrito antes de cancelar
    if (!this.suscripcionesActivas().has(fondo.id)) {
      return false; // no permitir cancelación
    }

    this.saldo.set(this.saldo() + monto);

    // Eliminar la suscripción activa
    const nuevasSuscripciones = new Set(this.suscripcionesActivas());
    nuevasSuscripciones.delete(fondo.id);
    this.suscripcionesActivas.set(nuevasSuscripciones);

    const transaccion: Transaccion = {
      id: Date.now(),
      fondo,
      tipo: 'Cancelacion',
      monto,
      fecha: new Date(),
    };
    this.transacciones.update((t) => [...t, transaccion]);

    return true;
  }
}
