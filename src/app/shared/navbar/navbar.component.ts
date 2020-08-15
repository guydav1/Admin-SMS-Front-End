import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string = 'test';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
   this.username = this.userService.userValue.userName;
  }

  logout() {
    this.userService.logout();
  }
}
