import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor() {
  }

  static errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
