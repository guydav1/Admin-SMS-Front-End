import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
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
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal
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
    this.loading = true;
    // this.userService.update(this.user.id, {
    //   userName: this.user.userName,
    //   password: 
    // })
  }

  deleteUser() {
    this.userService.delete(this.user.id).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("Delete User");
      this.deleteUser();
    });
  }
}
