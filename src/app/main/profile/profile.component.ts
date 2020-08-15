import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(user => {
      this.user = user;
    })
  }

}
