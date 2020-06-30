import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Department} from '../_models/department';
import {catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(public http: HttpClient) {
  }

  // Http headers
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  /**
   * @return: trả ra mảng Department[] bộ môn
   */
  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>('/api/departments/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // tslint:disable-next-line:ban-types
  addDepartment(data): Observable<Boolean> {
    // @ts-ignore
    // tslint:disable-next-line:ban-types
    return this.http.post<Boolean>('/api/departments/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // xử lý đưa ra lỗi nếu có
  errorHandl(error) {
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
