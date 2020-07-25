import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService : UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.userService.userValue && this.userService.userValue.token){
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.userService.userValue.token}`
        }
    });
    }
    return next.handle(request);
  }
}
