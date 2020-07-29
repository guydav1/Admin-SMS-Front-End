import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form :NgForm;
  loading:boolean = false;
  error:number = null

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.loading = true;
    this.userService.login(this.form.value.userName, this.form.value.password).subscribe(res => {
      this.router.navigate(['../']);
    }, err => {
      this.error = err.status;
      this.loading = false;
      console.log(err);
    })
  }

}
