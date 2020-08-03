import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../_models/department';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {baseUrl, httpOptions} from "../_models/constant";


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {
  }

  /**
   * @param: null
   * @return: trả ra mảng Department[] bộ môn
   */
  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(baseUrl + 'api/departments/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(BaseService.errorHandl)
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
    return this.http.post<Boolean>(baseUrl + 'api/departments/add', JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  /**
   *
   * @param id
   * return : trả về 1 department theo id
   */
  findDepartmentById(id): Observable<Department> {
    return this.http.get<Department>(baseUrl + 'api/departments/get-by-id/' + id)
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
  editDepartment(data: Department): Observable<Boolean> {
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.put<Boolean>(baseUrl + 'api/departments/edit/' + data.id, JSON.stringify(data), httpOptions)
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
  deleteDepartment(id): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<Boolean>(baseUrl + 'api/departments/delete/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

}
