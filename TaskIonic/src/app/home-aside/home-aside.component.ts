import {User} from "./../_models/user";
import {Component, OnInit} from "@angular/core";
import {AccountServiceService} from "../_services/account-service.service";

@Component({selector: "app-home-aside", templateUrl: "./home-aside.component.html", styleUrls: ["./home-aside.component.css"]})
export class HomeAsideComponent implements OnInit {
  user: User | null = null;
  constructor(private accountService : AccountServiceService) {
    this.accountService.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}
}
