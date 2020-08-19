import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editing: boolean = false;
  user: User = new User();
  temp: string;
  error: string;

  chartOptions = {
    colors: ['#000000'],
    legend: 'none',
    lineWidth: 10,
  };

  dailyWeather;
  news;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
    });

    // get daily weather from API and set it to dailyWeather as an array of [date, temp]
    this.dailyWeather = new Promise((resolve) => {
      this.http
        .get(
          'https://api.openweathermap.org/data/2.5/onecall?lat=31.66926&lon=34.57149&exclude=minutely,hourly&units=metric&appid=30be2b1eb3531390bdd4a8a8f58cdcfe'
        )
        .subscribe((res: any) => {
          let arr = [];
          for (let i = 0; i < res.daily.length; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            arr.push([formatDate(date, 'dd/MM', 'en'), res.daily[i].temp.day]);
          }
          resolve(arr);
        });
    });

    // get News
    this.news = new Promise((resolve) => {
      this.http
        .get(environment.apiUrl + '/news')
        .subscribe((res) => {
          resolve(res)
        });
    });
  }

  // edit(a: HTMLInputElement) {
  //   this.temp = a.value;
  //   this.editing = true;
  //   a.readOnly = false;
  //   a.classList.remove('border-0');
  // }

  // confirm(a: HTMLInputElement) {
  //   if (a.value === '') {
  //     return;
  //   }
  //   this.editing = false;
  //   a.readOnly = true;
  //   a.classList.add('border-0');
  //   let newData = { [a.name]: a.value };

  //   if (a.value !== this.temp) {
  //     this.userService.updateOwn(newData).subscribe(
  //       (res) => {
  //         console.log(res);
  //       },
  //       (err) => {
  //         console.log(err.error.code);
  //         if (err.error.code === 11001) {
  //           this.error = a.name + ' is already in use.';
  //         }
  //         a.value = this.temp;
  //       }
  //     );
  //   }
  // }
}
