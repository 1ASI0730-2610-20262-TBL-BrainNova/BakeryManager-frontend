import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { LoginPageComponent } from './IAM/interfaces/pages/login-page/login-page.component';
import { SignUpComponent } from './IAM/interfaces/components/sign-up/sign-up.component';
import { authenticationGuard } from './IAM/infrastructure/guards/authentication.guard';

const about = () => import('./shared/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const inventoryManagement = () => import('./inventory/presentation/views/inventory-management/inventory-management').then((m) => m.InventoryManagement);

const baseTitle = 'BakeryManager';

export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginPageComponent, title: `${baseTitle} - Sign In` },
  { path: 'sign-up', component: SignUpComponent, title: `${baseTitle} - Sign Up` },
  { path: 'inventory', loadComponent: inventoryManagement, canActivate: [authenticationGuard], title: `${baseTitle} - Inventory` },
  { path: 'home', component: Home, canActivate: [authenticationGuard], title: `${baseTitle} - Home` },
  { path: 'about', loadComponent: about, canActivate: [authenticationGuard], title: `${baseTitle} - About` },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
