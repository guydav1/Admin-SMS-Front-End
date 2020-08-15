import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  loading: boolean = false;
  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.userService.register(this.form.value).subscribe((res: {user}) => {
      let u = this.userService.mapUser(res.user)
      this.loading = false;
      this.activeModal.close(u);
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

}
