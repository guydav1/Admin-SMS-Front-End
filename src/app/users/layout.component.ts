import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({ templateUrl: 'layout.component.html'})
export class LayoutComponent {
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