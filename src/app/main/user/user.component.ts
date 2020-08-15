import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Pipe } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: Partial<User> = new User();

  id: string;
  loading: boolean = false;
  error: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];

      this.userService.getUser(this.id).subscribe((user) => {
        this.user = user;
      });
    });
  }


  onSubmit() {
    this.loading = true;
    this.userService.update(this.id, 
      {
              userName: this.user.userName,
              password: this.user.password,
              smsNotify: this.user.smsNotify,
              email: this.user.email,
              name: this.user.name,
              mobile: this.user.mobile
              
            }
      ).subscribe(res =>{
      this.error = 'Successfully updated'
      console.log(res);
    }, err=> {
      this.error = err.error.message;
      console.log(err);
    })
  }

  deleteUser() {
    this.userService.delete(this.id).subscribe(
      (res) => {
        this.router.navigate(['/users']);
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
