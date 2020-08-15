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
      .post<{user: User, token: string}>(environment.apiUrl + '/users/login', loginData)
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify({...user.user, token: user.token}));
          this.userSubject.next({...user.user, token: user.token});
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/u/login');
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

  getUser(id: string) {

    return this.http
      .get<User>(environment.apiUrl + '/users/' + id)
      // .pipe(
      //   map(this.mapUser)
      // );
  }


  addUser(user: Partial<User>){
    return this.http.post(environment.apiUrl + '/users/add', user);
  }

  getProfile() {
    return this.http.get<User>(environment.apiUrl + '/users/me');
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

  send(id:string, message:string) {
    return this.http.post(environment.apiUrl + '/post/' + id, {message: message}, {responseType: 'text'});
  }

  sendAll(message:string) {
    return this.http.post(environment.apiUrl + '/post', {message: message}, {responseType: 'text'});
  }

  mapUser(user){
    return {
      email: user.email,
      userName: user.userName,
      name: user.name,
      phone: user.mobile,
      sms: user.smsNotify,
      id: user._id,
      isAdmin: user.isAdmin
    };
  }




}
