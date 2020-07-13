import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Categories} from "../_models/categories";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(public http: HttpClient, private baseService: BaseService) {
  }

  // Http headers
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };


  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseService.baseUrl + '/qly-do-an/api/categories/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // tslint:disable-next-line:ban-types
  addCategoryies(data): Observable<any> {
    // @ts-ignore
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.post<any>(this.baseService.baseUrl + '/qly-do-an/api/categories/add', JSON.stringify(data), this.httpOptions)
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
  findCategoriesById(id): Observable<Categories> {
    return this.http.get<Categories>(this.baseService.baseUrl + '/qly-do-an/api/categories/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // tslint:disable-next-line:ban-types
  editCategories(data: Categories): Observable<Boolean> {
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.put<Boolean>(this.baseService.baseUrl + '/qly-do-an/api/categories/edit/' + data.id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }


  // tslint:disable-next-line:ban-types
  deleteCategories(id): Observable<any> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<any>(this.baseService.baseUrl + '/qly-do-an/api/categories/delete/' + id)
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
