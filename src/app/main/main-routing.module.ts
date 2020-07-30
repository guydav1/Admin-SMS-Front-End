import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { UserComponent } from '../user/user.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [

  { 
      path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
      children: [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: DashboardComponent },
  { path: 'users/:id', component: UserComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
