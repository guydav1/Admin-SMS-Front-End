import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.userValue.isAdmin;
   
  }

}
