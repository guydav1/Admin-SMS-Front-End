import { MainRoutingModule } from './main-routing.module';
import { FilterPipe } from './../filter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from '../user/user.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DashboardComponent, UserComponent, FilterPipe],
  imports: [
    CommonModule,BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, MainRoutingModule
  ]
})
export class MainModule { }
