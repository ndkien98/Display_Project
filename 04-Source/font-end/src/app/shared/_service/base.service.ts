import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = 'https://st-dse.vnua.edu.vn:6885/';

  constructor(public http: HttpClient) {
  }
}
