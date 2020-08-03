import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Categories} from "../_models/categories";
import {baseUrl, httpOptions} from "../_models/constant";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(baseUrl + 'api/categories/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  // tslint:disable-next-line:ban-types
  addCategoryies(data): Observable<any> {
    // @ts-ignore
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.post<any>(baseUrl + 'api/categories/add', JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  findCategoriesById(id): Observable<Categories> {
    return this.http.get<Categories>(baseUrl + 'api/categories/get-by-id/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

  // tslint:disable-next-line:ban-types
  editCategories(data: Categories): Observable<Boolean> {
    // tslint:disable-next-line:ban-types max-line-length
    return this.http.put<Boolean>(baseUrl + 'api/categories/edit/' + data.id, JSON.stringify(data), httpOptions)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }


  // tslint:disable-next-line:ban-types
  deleteCategories(id): Observable<any> {
    // tslint:disable-next-line:ban-types
    return this.http.delete<any>(baseUrl + 'api/categories/delete/' + id)
      .pipe(
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

}
