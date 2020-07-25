import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user = {
    userName: '',
    email: '',
    phone: '',
    name: '',
    sms: false,
    id: '',
  };

  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];

      this.userService.getProfile(this.id).subscribe((user) => {
        this.user = user;
      });
    });
  }


  onSubmit() {
    // this.userService.update(this.user.id, {
    //   userName: this.user.userName,
    //   password: 
    // })
  }

  deleteUser() {
    this.userService.delete(this.user.id).subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
