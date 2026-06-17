import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { iamGuard } from './iam/infrastructure/iam.guard';

const about = () => import('./shared/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const iamRoutes = () => import('./iam/presentation/iam.routes').then((m) => m.iamRoutes);

// TODO: importa tu ruta de inventory cuando esté lista
// const inventoryRoutes = () => import('./inventory/presentation/inventory.routes').then(m => m.inventoryRoutes);

const baseTitle = 'BakeryManager';

/**
 * Root route configuration that composes bounded-context routes.
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home`, canActivate: [iamGuard] },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
  // { path: 'inventory', loadChildren: inventoryRoutes, canActivate: [iamGuard] },
  { path: 'iam', loadChildren: iamRoutes },
  { path: '', redirectTo: '/iam/sign-in', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
