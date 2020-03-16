import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class RegistroService {
  constructor(private http: HttpClient) { }

  doRegistro(email: string, username: string, password: string){
      return this.http.post<any>('/api/registro',{email ,username, password});
    }
}
