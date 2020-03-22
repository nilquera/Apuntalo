import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CardetailService {
  constructor(private http: HttpClient) { }

  getCarDetail(name: string){
      return this.http.get<any>('api/degrees/'+name);
    }
}
