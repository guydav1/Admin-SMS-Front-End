import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './../shared/footer/footer.component';
import { NavbarComponent } from './../shared/navbar/navbar.component';
import { SidebarComponent } from './../shared/sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FilterPipe } from './../filter.pipe';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAddComponent } from './user-add/user-add.component';


@NgModule({
  declarations: [MainLayoutComponent, UserComponent, FilterPipe, SidebarComponent, NavbarComponent, FooterComponent, UserListComponent, SendSmsComponent, ProfileComponent, UserAddComponent],
  imports: [
    CommonModule, HttpClientModule, FormsModule, MainRoutingModule, NgbModule
  ]
})
export class MainModule { }
