import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Subjects} from "../_models/subjects";


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
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
   * @return: trả ra mảng Subjects[] môn học
   */
  getSubjects(): Observable<Subjects[]> {
    return this.http.get<Subjects[]>(this.baseService.baseUrl + '/qly-do-an/api/subjects/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param data : Subjects
   * @return thành công trả về status 200, thất bại trả về exeption
   */
  // tslint:disable-next-line:ban-types
  addSubjects(data: Subjects): Observable<any> {
    // @ts-ignore
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.post<any>(this.baseService.baseUrl + '/qly-do-an/api/subjects/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param id
   * return : trả về 1 Subjects theo id
   */
  findSubjectsById(id): Observable<Subjects> {
    return this.http.get<Subjects>(this.baseService.baseUrl + '/qly-do-an/api/subjects/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param data : Subjects
   *
   * @return thành công trả về status 200 , thất bại trả về exeption
   */
  // tslint:disable-next-line:ban-types
  editSubject(data: Subjects, id: any): Observable<Boolean> {
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.put<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/subjects/edit/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  /**
   *
   * @param id
   *
   * @return thành công trả về status 200 , thất bại trả về exeption
   */
  // tslint:disable-next-line:ban-types
  deleteSubjects(id): Observable<any> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<any>(this.baseService.baseUrl + '/qly-do-an/api/subjects/delete/' + id)
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
