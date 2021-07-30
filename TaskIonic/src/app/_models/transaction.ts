import { User } from './user';
import { Account } from "./account";

enum TransactionType {
    Withdraw = 'Withdraw',
    Deposit = 'Deposit',

}

export class Transaction {
    constructor(
        public _id :any,
        public amount : number,
        public type : TransactionType ,
        public createdAt:any ,
        public account : Account|null = null,
        public User : User|null = null ,
        ) {}
}
