import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {YearsSemester} from '../_models/years-semester';
import {baseUrl, httpOptions} from "../_models/constant";


@Injectable({
  providedIn: 'root'
})
export class YearsSemesterService {
  constructor(private http: HttpClient) {
  }

  /**
   * @param: null
   * @return: trả ra mảng years-semester[] năm học - học kỳ
   */
  getAllYearsSemester(): Observable<YearsSemester[]> {
    return this.http.get<YearsSemester[]>(baseUrl + 'api/years-semesters/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(BaseService.errorHandl)
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
    return this.http.post<Boolean>(baseUrl + 'api/years-semesters/add', JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  /**
   *
   * @param id
   * return : trả về 1 years-semester theo id
   */
  findYearsSemesterById(id): Observable<YearsSemester> {
    return this.http.get<YearsSemester>(baseUrl + 'api/years-semesters/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
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
    return this.http.put<Boolean>(baseUrl + 'api/years-semester/edit/' + data.id, JSON.stringify(data),httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
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
    return this.http.delete<Boolean>(baseUrl + 'api/years-semesters/delete/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }


}
