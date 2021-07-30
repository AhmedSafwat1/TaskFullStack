import { User } from './../_models/user';
import {Component, OnInit} from "@angular/core";
import {AccountServiceService} from "../_services/account-service.service";

@Component({selector: "app-nav-home", templateUrl: "./nav-home.component.html", styleUrls: ["./nav-home.component.css"]})
export class NavHomeComponent implements OnInit {
  collapsed = true;

  user: User | null = null;
  constructor(private accountService : AccountServiceService) {
    this.accountService.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
    return false;
  }
}
