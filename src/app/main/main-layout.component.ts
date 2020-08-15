import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'main-layout.component.html' })
export class MainLayoutComponent {
  isLoading: boolean = false;

  constructor(private router: Router, private userService: UserService) {

    if (!this.userService.userValue) {
      this.router.navigate(['/u/login']);
    }
  }
}
