import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable, throwError} from 'rxjs';
import {Courses} from '../_models/courses';
import {catchError, retry} from 'rxjs/operators';
import {YearsSemester} from '../_models/years-semester';

@Injectable({
    providedIn: 'root',
  })

export class CoursesService {
  constructor(public http: HttpClient, private baseService: BaseService) {
  }

  // Http headers
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  getAllCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.baseService.baseUrl + '/qly-do-an/api/courses/get-all')
      .pipe(  retry(1),
        catchError(this.errorHandl)
      );
  }

  findCoursesById(id): Observable<Courses> {
    return this.http.get<Courses>(this.baseService.baseUrl + '/qly-do-an/api/courses/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }
  getCoursesByYearSemesterId(id): Observable<boolean> {
    // @ts-ignore
    return this.http.get<Courses[]>(this.baseService.baseUrl + '/qly-do-an/api/courses/get-by-year-semester-id/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );

  }

  // tslint:disable-next-line:ban-types
  deleteCourses(id): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/courses/delete/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

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
