import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from './base.service';
import {Role} from "../_models/role";
import {baseUrl} from "../_models/constant";


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(baseUrl + 'api/roles/get-all')
      .pipe( // kiểm tra trạng thái gọi thành công hay không
        retry(1),
        catchError(BaseService.errorHandl)
      );
  }

}
