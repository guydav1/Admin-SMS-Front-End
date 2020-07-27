import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({ templateUrl: 'main-layout.component.html' })
export class MainLayoutComponent {
    constructor(
        private router: Router,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
    }
}