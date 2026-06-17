import { Routes } from '@angular/router';

const production = () => import('./views/production/production').then((m) => m.Production);

/**
 * Route tree for production presentation views.
 */
export const productionRoutes: Routes = [
  { path: 'dashboard', loadComponent: production },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
