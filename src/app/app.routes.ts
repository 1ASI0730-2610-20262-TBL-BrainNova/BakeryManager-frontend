import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { InventoryManagement } from './inventory/presentation/views/./inventory-management/inventory-management';
const about = () => import('./shared/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const productionRoutes = () =>
  import('./production/presentation/production.routes').then((m) => m.productionRoutes);

const baseTitle = 'BakeryManager';

/**
 * Root route configuration that composes bounded-context routes.
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'production', loadChildren: productionRoutes },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
  // TODO: Add more paths here!
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
