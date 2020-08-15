import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css'],
})
export class SendSmsComponent implements OnInit {
  sending: boolean = false;
  checkAll: boolean = false;
  message: string = '';

  users: {
    id: string;
    name: string;
    phone: string;
    sms: boolean;
    loading: boolean;
    sent: boolean;
  }[] = [];
  checkedUsers = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((res) => {
      this.users = res;
      this.users = this.users
        .filter((user) => user.sms)
        .map((user) => {
          user.loading = false;
          return user;
        });
    });
  }

  onSubmit() {
    this.sending = true;

    // Get all checked users.
    for (let i = 0; i < this.users.length; i++) {
      let input: HTMLInputElement = document.querySelector('#in' + i);
      if (input.checked) {
        this.users[i].loading = true;
        this.checkedUsers.push(this.users[i]);
      }
    }

    // End here if no selected users.
    if (!this.checkedUsers.length) {
      this.sending = false;
      return;
    }

    // Send SMS to checked users.
    const sendLoop = (user, message) => {
      this.userService
        .send(user.id, message)
        .subscribe(
          (res) => {
            console.log('in res');
            console.log(res);
            user.sent = true;
          },
          (err) => {
            console.log('in error');
            console.log(err);
            user.sent = false;
          }
        )
        .add(() => {
          console.log('in final');
          user.loading = false;
          if (this.checkedUsers.length) {
            sendLoop(this.checkedUsers.shift(), this.message);
          } else {
            this.checkAll = false;
            this.sending = false;
            console.log('done');
          }
        });
    };

    sendLoop(this.checkedUsers.shift(), this.message);
  }
}
