import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {User} from "../_models/user";
import {map} from "rxjs/operators";
import { AppResponse } from "../_models/AppResponse";

@Injectable({providedIn: "root"})
export class AccountServiceService {
  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;

  constructor(private router : Router, private http : HttpClient) {
    this.userSubject = new BehaviorSubject<User|null>(JSON.parse(localStorage.getItem("user")  || "null"));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User|null {
    return this.userSubject.value;
  }

  login(user_name : string, password : string) {
    return this.http.post<AppResponse>(`${environment.apiUrl}/auth/login`, {user_name, password}).pipe(map((res:AppResponse) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      let user = <User> res.response;
      localStorage.setItem("user", JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
    
  }

  profile() {
    return this.http.get<AppResponse>(`${environment.apiUrl}/users/home`);
    
  }

  logout() {
    // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
  }
}
