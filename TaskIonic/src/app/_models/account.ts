import { User } from './user';
enum AccountType {
    Savings = 'Savings',
    Checking = 'Checking',

}

export class Account {
    constructor(
        public _id :any,
        public number : number,
        public balance : number,
        public type : AccountType ,
        public User : User|null = null ,
        ) {}
}
