import { Routes } from '@angular/router';

const dashboard = () => import('./views/dashboard/dashboard').then((m) => m.Dashboard);
// TODO: ADD SENSOR, INCIDENT AND ALERT COMPONENTS AND ROUTES

/**
 * Route tree for monitoring presentation views.
 */
export const monitoringRoutes: Routes = [
  { path: 'dashboard', loadComponent: dashboard },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //{ path: 'sensors', loadComponent: undefined },
  //{ path: 'incidents', loadComponent: undefined },
  //{ path: 'alerts', loadComponent: undefined }
]
