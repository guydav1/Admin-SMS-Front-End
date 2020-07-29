import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { UserComponent } from '../user/user.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [

  { 
      path: '', component: MainLayoutComponent,
      children: [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
