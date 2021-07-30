import { Transaction } from './../_models/transaction';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../_models/account';
import { User } from '../_models/user';
import { AccountServiceService } from '../_services/account-service.service';
import { AppResponse } from '../_models/AppResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user:User|null =null ;
  public transactions:Array<Transaction> =[] ;
  public accounts:Array<Account> =[] ;
  loading:boolean = false;

  constructor(
    private accountService : AccountServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.accountService.profile().subscribe({
      next:(res:AppResponse)=>{
        this.user        = res.response.user 
        this.accounts    = res.response.accounts;
        this.transactions= res.response.transactions
        this.loading = false;
      },
      error: (error : AppResponse) => {
        this.toastr.error(error.response, error.code);
        this.loading = false;
      }
    })
  }

}
