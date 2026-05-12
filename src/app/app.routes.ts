import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { Production } from './shared/presentation/views/production/production';

const about = () => import('./shared/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'BakeryManager';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'production', component: Production, title: `${baseTitle} - Production` },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
  // TODO: Add more paths here!
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
