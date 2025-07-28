import { Routes } from '@angular/router';
import { UserComponent } from './component/user-component/user-component';
import { RoleComponent } from './component/role-component/role-component';
import { ItemComponent } from './component/item-component/item-component';
import { SalesComponent } from './component/sales-component/sales-component';
import { DashboardComponent } from './component/dashboard-component/dashboard-component';
import { LoginComponent } from './component/login-component/login-component';

export const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'roles', component: RoleComponent },
  { path: 'items', component: ItemComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
];
