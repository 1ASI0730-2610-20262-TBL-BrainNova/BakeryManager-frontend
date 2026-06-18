import { Routes } from '@angular/router';

const inventoryManagement = () =>
  import('./views/inventory-management/inventory-management').then((m) => m.InventoryManagement);

/**
 * Route tree for inventory presentation views.
 */
export const inventoryRoutes: Routes = [
  { path: 'management', loadComponent: inventoryManagement },
  { path: '', redirectTo: 'management', pathMatch: 'full' },
];
