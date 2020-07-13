import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {YearsSemester} from '../_models/years-semester';


@Injectable({
  providedIn: 'root'
})
export class YearsSemesterService {
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
   * @return: trả ra mảng years-semester[] năm học - học kỳ
   */
  getAllYearsSemester(): Observable<YearsSemester[]> {
    return this.http.get<YearsSemester[]>(this.baseService.baseUrl + '/qly-do-an/api/years-semesters/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param data : yesars-semester
   * @return thành công trả về true, thất bại trả về false
   */
  // tslint:disable-next-line:ban-types
  addYearsSemester(data: YearsSemester): Observable<Boolean> {
    // @ts-ignore
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.post<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/years-semesters/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param id
   * return : trả về 1 years-semester theo id
   */
  findYearsSemesterById(id): Observable<YearsSemester> {
    return this.http.get<YearsSemester>(this.baseService.baseUrl + '/qly-do-an/api/years-semesters/get-by-id/' + id)
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
  editYearsSemester(data: YearsSemester): Observable<Boolean> {
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.put<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/years-semester/edit/' + data.id, JSON.stringify(data), this.httpOptions)
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
  deleteYearsSemester(id): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/years-semesters/delete/' + id)
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
