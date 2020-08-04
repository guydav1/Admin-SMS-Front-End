import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

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
  constructor(private userService: UserService) {}

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

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map((term) =>
  //       term.length < 2
  //         ? []
  //         : this.users
  //             .filter(
  //               (v) => v.userName.toLowerCase().indexOf(term.toLowerCase()) > -1
  //             )
  //             .slice(0, 10).map(v=> v.userName)
  //     )
  //   );

  // formatter = (result: any) => {
  //   console.log(result);
  //   return result.userName;
  // };
}
