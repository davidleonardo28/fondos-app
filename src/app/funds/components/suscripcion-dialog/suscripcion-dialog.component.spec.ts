import { TestBed } from '@angular/core/testing';
import { SuscripcionDialogComponent } from './suscripcion-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('SuscripcionDialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionDialogComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SuscripcionDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
