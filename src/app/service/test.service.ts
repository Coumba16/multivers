import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _http: HttpClient) {}

  addTest(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/test', data);
  }

  getTestList(): Observable<any> {
    return this._http.get('http://localhost:3000/test');
  }

}
