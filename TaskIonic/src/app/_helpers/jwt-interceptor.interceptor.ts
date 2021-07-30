import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountServiceService } from '../_services/account-service.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.token;
    if (isLoggedIn) {
        request = request.clone({
            setHeaders: {
               authorization: `${user?.token}`
            }
        });
    }

    return next.handle(request);
  }
}
