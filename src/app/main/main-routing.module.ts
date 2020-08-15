import { ProfileComponent } from './profile/profile.component';
import { AuthAdminGuard } from './../auth-admin.guard';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'profile',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: ProfileComponent }],
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserComponent },
    ],
  },
  {
    path: 'sms',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      { path: '', component: SendSmsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
