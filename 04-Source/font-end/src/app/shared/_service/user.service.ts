import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Lecturer, Student, User} from "../_models/user";
import {baseUrl, httpOptions} from "../_models/constant";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + 'api/users/get-all')
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  getStudentById(id): Observable<Student> {
    return this.http.get<Student>(baseUrl + 'api/users/get-student-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  getLectureById(id): Observable<Lecturer> {
    return this.http.get<Lecturer>(baseUrl + 'api/users/get-lecturer-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  getUserById(id): Observable<any> {
    return this.http.get<User>(baseUrl + 'api/users/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  addStudent(data): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/users/add-student', JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  addLecture(data): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/users/add-lecturer', JSON.stringify(data),httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  editStudent(data, id): Observable<any> {
    return this.http.put<any>(baseUrl + 'api/users/edit-student/' + id, JSON.stringify(data),httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  editLecture(data, id): Observable<any> {
    return this.http.put<any>(baseUrl + 'api/users/edit-lecturer/' + id, JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  deleteUser(id): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/users/delete/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }


  /**
   * @param: null
   * @return: trả ra mảng lecture[] môn học
   */
  getLectures(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(baseUrl + '/api/users/get-lecturers')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }
}
