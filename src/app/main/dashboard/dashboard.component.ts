import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  error:string = null;
  loading: boolean = true;

  searchInput: string = '';
  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(res=>{
      this.users = this.users.concat(res);
      this.loading = false;
    }, err=> {
      console.log(err);
      this.error = err.message
      this.loading = false;
    })    
  }


}
