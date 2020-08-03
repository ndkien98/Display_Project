import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Courses} from '../_models/courses';
import {catchError, retry} from 'rxjs/operators';
import {baseUrl, httpOptions} from "../_models/constant";

@Injectable({
  providedIn: 'root',
})

export class CoursesService {
  constructor(private http: HttpClient) {
  }

  getAllCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(baseUrl + 'api/courses/get-all')
      .pipe(retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  addCourse(data): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/courses/add', JSON.stringify(data), httpOptions)
      .pipe(retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  editCourse(data, id): Observable<any> {
    return this.http.put<any>(baseUrl + 'api/courses/edit/' + id, JSON.stringify(data), httpOptions)
      .pipe(retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  findCoursesById(id): Observable<Courses> {
    return this.http.get<Courses>(baseUrl + 'api/courses/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  getCoursesByYearSemesterId(id): Observable<boolean> {
    // @ts-ignore
    return this.http.get<Courses[]>(baseUrl + 'api/courses/get-by-year-semester-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );

  }

  // tslint:disable-next-line:ban-types
  deleteCourses(id): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<Boolean>(baseUrl + 'api/courses/delete/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }
}
