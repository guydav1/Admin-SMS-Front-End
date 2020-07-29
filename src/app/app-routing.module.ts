import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);
const mainModule = () => import('./main/main.module').then((x) => x.MainModule);

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', loadChildren: mainModule },
  { path: 'users', loadChildren: usersModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
