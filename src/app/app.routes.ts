import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'fondos',
    pathMatch: 'full',
  },
  {
    path: 'fondos',
    loadComponent: () =>
      import('./funds/components/fondos/fondos.component').then(
        (m) => m.FondosComponent
      ),
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./funds/components/historial/historial.component').then(
        (m) => m.HistorialComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'fondos',
  },
];
