import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/header/material.module';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'historial',
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
})
export class HistorialComponent {
  displayedColumns: string[] = ['fecha', 'tipo', 'fondo', 'monto'];

  // Signal reactivo para todas las transacciones
  allTransacciones = computed(() => this.usuarioService.transacciones());

  // Signal para filtro seleccionado
  filtroTipo = signal<string>(''); // '' significa mostrar todo

  // Signal para lista filtrada
  transaccionesFiltradas = computed(() => {
    const tipoFiltro = this.filtroTipo();
    if (tipoFiltro) {
      return this.allTransacciones().filter((tx) => tx.tipo === tipoFiltro);
    }
    return this.allTransacciones();
  });

  constructor(private usuarioService: UsuarioService) {}
}
