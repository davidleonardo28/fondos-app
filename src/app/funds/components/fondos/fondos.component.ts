import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FondosService } from '../../services/fondos.service';
import { UsuarioService } from '../../services/usuario.service';
import { MaterialModule } from '../../../shared/header/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistorialComponent } from '../historial/historial.component';
import { MatDialog } from '@angular/material/dialog';
import { SuscripcionDialogComponent } from '../suscripcion-dialog/suscripcion-dialog.component';

@Component({
  selector: 'app-fondos',
  imports: [
    CommonModule,
    MaterialModule,
    HistorialComponent,
    HistorialComponent,
  ],
  templateUrl: './fondos.component.html',
  styleUrls: ['./fondos.component.css'],
})
export class FondosComponent {
  constructor(
    public fondosService: FondosService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get listaFondos() {
    return this.fondosService.fondosSignal();
  }

  suscribirse(fondo: any) {
    const dialogRef = this.dialog.open(SuscripcionDialogComponent, {
      width: '475px',
      maxHeight: 'none',
      panelClass: 'custom-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí puedes manejar el método de notificación
        console.log('Método seleccionado:', result.metodo);
        console.log('Contacto ingresado:', result.contacto);

        const success = this.usuarioService.suscribirse(
          fondo,
          fondo.montoMinimo
        );
        this.snackBar.open(
          success ? '✅ Suscripción exitosa' : '❌ Saldo insuficiente',
          'Cerrar',
          { duration: 3000 }
        );
      }
    });
  }

  cancelar(fondo: any) {
    const success = this.usuarioService.cancelar(fondo, fondo.montoMinimo);

    if (success) {
      this.snackBar.open('❌ Participación cancelada', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open(
        '⚠️ No tienes suscripción activa para este fondo.',
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['custom-snackbar-center'],
        }
      );
    }
  }
}
