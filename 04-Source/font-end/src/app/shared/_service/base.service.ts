import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = 'http://localhost:8080/';

  constructor(public http: HttpClient) {
  }
  // Http headers
  httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}
