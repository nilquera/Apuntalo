import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  doLogin(username: string, password: string){
      return this.http.post<any>('api/login',{username, password})
      .subscribe(data => {
        console.log(data, "resposta")
      });
    }
}
