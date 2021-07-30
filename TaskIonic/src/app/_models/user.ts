import { environment } from "src/environments/environment";

export class User {
  constructor(
      public _id :any,
      public name : string,
      public user_name : string,
      public email : string ,
      public image:string|null = null,
      public token:string|null = null,
      ) {
          if(this.image){
              this.image = String(environment.apiUrl) + this.image
          }
      }
}
