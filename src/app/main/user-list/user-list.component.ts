import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
