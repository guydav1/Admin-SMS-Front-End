import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') form : NgForm
  passwordRegex:string = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$"
  loading: boolean = false;
  password:string;
  error: HttpErrorResponse = null

  showPassword:boolean = false;

  constructor(private userSerive : UserService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.userSerive.register(this.form.value).subscribe(data => {
      this.router.navigate(['../login'], { relativeTo: this.route });
      this.loading = false;
    }, err=>{
      console.log(err);
      this.error = err;
      this.loading = false;
    })
  }

}
