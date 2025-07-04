import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fondo } from '../interfaces/fondo.model';

@Injectable({ providedIn: 'root' })
export class FondosService {
  //private apiUrl = 'assets/fondos.json';

  //  Signal reactivo para los fondos
  fondosSignal = signal<Fondo[]>([]);

  constructor(private http: HttpClient) {
    this.cargarFondos();
  }

  async cargarFondos() {
    // Simula un retardo de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const fondos = await import('../../../assets/fondos.json');
    this.fondosSignal.set(fondos.default);
  }
}
