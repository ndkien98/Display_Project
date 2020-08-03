import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Subjects} from "../_models/subjects";
import {baseUrl, httpOptions} from "../_models/constant";


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  constructor(private http: HttpClient) {
  }

  /**
   * @param: null
   * @return: trả ra mảng Subjects[] môn học
   */
  getSubjects(): Observable<Subjects[]> {
    return this.http.get<Subjects[]>(baseUrl + 'api/subjects/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(BaseService.errorHandl)
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
    return this.http.post<any>(baseUrl + 'api/subjects/add', JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  /**
   *
   * @param id
   * return : trả về 1 Subjects theo id
   */
  findSubjectsById(id): Observable<Subjects> {
    return this.http.get<Subjects>(baseUrl + 'api/subjects/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
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
    return this.http.put<Boolean>(baseUrl + 'api/subjects/edit/' + id, JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  // this car is as beautiful as that one

  // this computer handle well than one

  // he is the most creative man in the class

  // this computer been has fixed by me

  /**
   *
   * @param id
   *
   * @return thành công trả về status 200 , thất bại trả về exeption
   */
  // tslint:disable-next-line:ban-types
  deleteSubjects(id): Observable<any> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<any>(baseUrl + 'api/subjects/delete/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }
}
