import { Routes } from '@angular/router';
import { UserComponent } from './component/user-component/user-component';
import { RoleComponent } from './component/role-component/role-component';
import { ItemComponent } from './component/item-component/item-component';
import { SalesComponent } from './component/sales-component/sales-component';
import { DashboardComponent } from './component/dashboard-component/dashboard-component';
import { LoginComponent } from './component/login-component/login-component';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'items',
    component: ItemComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'supervisor'] },
  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'salesPerson'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'supervisor'] },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
