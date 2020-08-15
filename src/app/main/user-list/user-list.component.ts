import { UserAddComponent } from './../user-add/user-add.component';
import { RegisterComponent } from './../../users/register/register.component';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  error: string = null;
  loading: boolean = true;

  searchInput: string = '';
  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (res) => {
        this.users = this.users.concat(res);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.error = err.message;
        this.loading = false;
      }
    );
  }

  openRegister() {
    const modalRef = this.modalService.open(UserAddComponent, {size: 'md'}).result.then(user =>{
      if(user){
        this.users.push(user);
      }
    }, reason => {});
    // modalRef.componentInstance.name = 'World';
  }

}
