import {CodeStatus} from "./../_models/AppResponse";
import {Injectable} from "@angular/core";
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AccountServiceService} from "../_services/account-service.service";
import {catchError} from "rxjs/operators";
import {AppResponse} from "../_models/AppResponse";

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private accountService : AccountServiceService) {}

  intercept(request : HttpRequest<unknown>, next : HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) => {
      if ([401, 403].includes(err.status) && this.accountService.userValue) {
        // auto logout if 401 or 403 response returned from api
        this.accountService.logout();
      }
      const error = err.error || new AppResponse(CodeStatus.backend_error, err.statusText);
      console.error(err, error);
      return throwError(error);
    }));
  }
}
