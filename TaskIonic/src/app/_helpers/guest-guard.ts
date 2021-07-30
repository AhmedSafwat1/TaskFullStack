import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AccountServiceService} from "../_services/account-service.service";

@Injectable({providedIn: "root"})
export class GuestGuard implements CanActivate {
  constructor(private router : Router, private accountService : AccountServiceService) {}

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): |Observable < boolean | UrlTree > |Promise < boolean | UrlTree > |boolean | UrlTree {
    const user = this.accountService.userValue;
    
    if (!user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/home"]);
    return false;
  }
}
