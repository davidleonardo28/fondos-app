import { TestBed } from '@angular/core/testing';
import { FondosComponent } from './fondos.component';
import { FondosService } from '../../services/fondos.service';
import { of } from 'rxjs';

describe('FondosComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondosComponent], // 👈 usa imports
      providers: [
        {
          provide: FondosService,
          useValue: {
            fondosSignal: () => [
              { nombre: 'Fondo Test', categoria: 'FPV', montoMinimo: 10000 },
            ],
          },
        },
      ],
    }).compileComponents();
  });

  it('debe renderizar el título', () => {
    const fixture = TestBed.createComponent(FondosComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fondos Disponibles');
  });

  it('debe mostrar lista de fondos', () => {
    const fixture = TestBed.createComponent(FondosComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fondo Test');
  });
});
