import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Department} from '../_models/department';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(public http: HttpClient, private baseService: BaseService) {
  }

  // Http headers
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  /**
   * @param: null
   * @return: trả ra mảng Department[] bộ môn
   */
  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseService.baseUrl + '/qly-do-an/api/departments/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param data : department
   * @return thành công trả về true, thất bại trả về false
   */
  // tslint:disable-next-line:ban-types
  addDepartment(data): Observable<Boolean> {
    // @ts-ignore
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.post<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/departments/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param id
   * return : trả về 1 department theo id
   */
  findDepartmentById(id): Observable<Department> {
    return this.http.get<Department>(this.baseService.baseUrl + '/qly-do-an/api/departments/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param data : Department
   *
   * @return thành công trả về true , thất bại trả về false
   */
  // tslint:disable-next-line:ban-types
  editDepartment(data: Department): Observable<Boolean> {
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.put<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/departments/edit/' + data.id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param id
   *
   * @return thành công trả về true , thất bại trả về false
   */
  // tslint:disable-next-line:ban-types
  deleteDepartment(id): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/departments/delete/' + id)
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
