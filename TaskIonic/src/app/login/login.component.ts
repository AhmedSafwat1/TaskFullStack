import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {first} from "rxjs/operators";
import {AppResponse, CodeStatus} from "../_models/AppResponse";
import {Error} from "../_models/error";
import { User } from "../_models/user";
import {AccountServiceService} from "../_services/account-service.service";

@Component({selector: "app-login", templateUrl: "./login.component.html", styleUrls: ["./login.component.css"]})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  errors: Array<Error> | null = [];

  constructor(
     private formBuilder : FormBuilder,
     private accountService : AccountServiceService,
     private route : ActivatedRoute, private router : Router ,
     private toastr: ToastrService
    ) {
    this.form = this.formBuilder.group({
      user_name: [
        "", Validators.required
      ],
      password: ["", Validators.required]
    });
    
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.user_name.value, this.f.password.value).pipe(first()).subscribe({
      next: (user:User) => {
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";
        this.router.navigateByUrl(returnUrl);
        this.loading = false;
        this.errors = []
      },
      error: (error : AppResponse) => {
        if (error.code == CodeStatus.validation_error) 
          this.errors = error.errors;
        else {
          this.toastr.error(error.response, error.code);
          this.errors = [];
        }
        this.loading = false;
      }
    });
  }
}
