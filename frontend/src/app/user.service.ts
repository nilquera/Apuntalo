import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId, token){
    var headers = { 'Authorization': token};
    return this.http.get<any>('api/users/'+ userId, {headers});
  }

  getBalance(token){
    var headers = { 'Authorization': token};
    return this.http.get<any>('api/bc/balance', {headers});
  }

  addBalance(amount, token){
    var headers = { 'Authorization': token};
    return this.http.post<any>('api/bc/ingresar',amount,{headers});
  }
}
