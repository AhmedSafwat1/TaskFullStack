import { Error } from "./error";

export enum CodeStatus {
  success = "SUCCESS",
  validation_error = "VALIDATION_ERROR",
  backend_error = "BACKEND_ERROR",
  token_error = "TOKEN_ERROR"
}

export class AppResponse {
  constructor(
      public code:string , 
      public response:any = null,
      public errors :Array<Error> | null = null) {}
}
