import { User } from './../models/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
}

  register(user: User) {
    return this.http.post(environment.apiUrl + '/register', user);
  }

  login(userName, password) {

    const loginData = {
      userName: userName,
      password: password,
    }

    return this.http
      .post<User>(environment.apiUrl + '/users/login', loginData)
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/users/login');
  }

  getAll() {
    return this.http.get<User[]>(environment.apiUrl + '/users').pipe(
      map((res) => {
        const newUsersArr = []

        res.forEach(user => {
          newUsersArr.push(this.mapUser(user))
        });
        return newUsersArr;
      })
    );
  }

  getUser(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .get<User>(environment.apiUrl + '/users/me', { headers: headers })
      .pipe(
        map(this.mapUser)
      );
  }

  getProfile(id: string) {
    return this.http
      .get<User>(environment.apiUrl + '/users/' + id)
      .pipe(
        map(this.mapUser)
      );
  }

  update(id:string, newData:Partial<User>) {
    return this.http.patch(environment.apiUrl + '/users/modify/' + id, newData).pipe(map(x=> {
      if (id == this.userValue._id) {
        // update local storage
        const user = { ...this.userValue, ...newData };
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        this.userSubject.next(user);
    }
      return x;
    }))
  }


  delete(id:string) {
    return this.http.delete(environment.apiUrl + '/users/delete/' + id).pipe(map(x=>{
      if(id === this.userValue._id){
        this.logout();
      }
      return x;
    }));
  }

  private mapUser(user){
    return {
      email: user.email,
      userName: user.userName,
      name: user.name,
      phone: user.mobile,
      sms: user.smsNotify,
      id: user._id,
    };
  }




}
