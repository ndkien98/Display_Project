import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = 'https://st-dse.vnua.edu.vn:6885/';

  buttonSubject: Subject<any> = new Subject();
  buttonObservable = this.buttonSubject.asObservable();

  constructor() {
  }
}
