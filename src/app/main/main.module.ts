import { SpinnerComponent } from './../shared/spinner/spinner.component';
import { FooterComponent } from './../shared/footer/footer.component';
import { NavbarComponent } from './../shared/navbar/navbar.component';
import { SidebarComponent } from './../shared/sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FilterPipe } from './../filter.pipe';
import { AppRoutingModule } from './../app-routing.module';
import { UserComponent } from '../user/user.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


@NgModule({
  declarations: [MainLayoutComponent, DashboardComponent, UserComponent, FilterPipe, SidebarComponent, NavbarComponent, FooterComponent, SpinnerComponent],
  imports: [
    CommonModule, HttpClientModule, FormsModule, MainRoutingModule
  ]
})
export class MainModule { }
