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
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [MainLayoutComponent, DashboardComponent, UserComponent, FilterPipe, SidebarComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule, HttpClientModule, FormsModule, MainRoutingModule, NgbModule
  ]
})
export class MainModule { }
