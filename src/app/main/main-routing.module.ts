import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
