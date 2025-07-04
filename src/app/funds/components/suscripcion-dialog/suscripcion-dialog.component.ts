import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/header/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscripcion-dialog',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './suscripcion-dialog.component.html',
  styleUrl: './suscripcion-dialog.component.css',
})
export class SuscripcionDialogComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SuscripcionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      metodo: ['email', Validators.required], // 👈 método inicial
      contacto: ['', Validators.required], // validación básica
    });

    // ✅ Ejecuta validaciones dinámicas de inmediato
    this.applyValidations(this.form.value.metodo);

    // Cambiar validaciones dinámicamente cuando el método cambie
    this.form.get('metodo')?.valueChanges.subscribe((metodo) => {
      this.form.get('contacto')?.reset();
      this.applyValidations(metodo);
    });
  }

  // Función para aplicar validaciones según el método
  applyValidations(metodo: string) {
    const contactoControl = this.form.get('contacto');
    if (metodo === 'email') {
      contactoControl?.setValidators([
        Validators.required,
        Validators.email, // ✅ validación nativa Angular
      ]);
    } else if (metodo === 'sms') {
      contactoControl?.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]);
    }
    contactoControl?.updateValueAndValidity();
  }

  confirmar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  // Validación personalizada opcional
  validarCampo(control: any) {
    const metodo = this.form?.get('metodo')?.value;
    const value = control.value;

    if (metodo === 'sms' && /\D/.test(value)) {
      return { soloNumeros: true };
    }
    return null;
  }
}
