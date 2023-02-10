import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {
  private API_URL = "http://localhost:3000";
  httpHeaders= new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient:HttpClient) { }

  //Add User
  AddUser(data:User):Observable<any>{
    let url= `${this.API_URL}/create`;
    return this.httpClient.post(url,data).pipe(catchError(this.handleError))
  }

  //Get all user
  getUsers(){
    return this.httpClient.get(`${this.API_URL}/users`);
  }

  //get user by id
  GetUser(id: any):Observable<any>{
    let url= `${this.API_URL}/users/${id}`;
    return this.httpClient.get(url,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  //Update User
  UpdateUser(data:User):Observable<any>{
    let url= `${this.API_URL}/user`;
    return this.httpClient.post(url,data).pipe(
      catchError(this.handleError)
    );
  };

  //Delete User
  DeleteUser(email:any):Observable<any>{
    let url= `${this.API_URL}/user/${email}`;
    return this.httpClient.delete(url,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  //Handle Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message};`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
