import { Component, computed, effect } from '@angular/core';
import { UsuarioService } from '../../funds/services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // Create a computed signal that observes balance
  saldoSignal = computed(() => this.usuarioService.saldo());

  constructor(private usuarioService: UsuarioService) {
    // Automatically reactivate view when changing
    effect(() => {
      this.saldoSignal(); // "mark" that we depend on the balance
    });
  }
}
