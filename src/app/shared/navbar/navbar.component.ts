import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string;
  private userSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe((user) => {
      if (user) this.username = this.userService.userValue.userName;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }
}
