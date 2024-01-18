import { Routes } from '@angular/router';
import { loggedGuard } from '@shared/guards/logged.guard';
import { notLoggedGuard } from '@shared/guards/not-logged.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
    title: 'Adoclic | Login',
    canActivate: [notLoggedGuard],
  },
  {
    path: 'shopping',
    loadComponent: () => import('./pages/shopping/shopping.component').then(c => c.ShoppingComponent),
    title: 'Adoclic | Shopping',
    canActivate: [loggedGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
