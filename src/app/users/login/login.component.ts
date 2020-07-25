import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form :NgForm;
  loading:boolean = false;
  error:number = null

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.userService.login(this.form.value.userName, this.form.value.password).subscribe(res => {
      this.router.navigate(['../']);
    }, err => {
      this.error = err.status
      console.log(err);
    })
  }

}