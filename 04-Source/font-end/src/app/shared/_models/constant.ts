import {HttpHeaders} from "@angular/common/http";

export const reload = true;

export const baseUrl = 'https://st-dse.vnua.edu.vn:6885/qly-do-an/';

export const baseUrlLocal = 'http://localhost:8080/';

export const test = 'https://st-dse.vnua.edu.vn:6885/qly-do-an/';

export const ID_ROLE_STUDENT = 3;

export const ID_ROLE_LECTURE = 2;

export const httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

export class DataConvertSelect2 {
  id: any;
  text: any;

  constructor(id?: any, text?: any) {
    this.id = id;
    this.text = text;
  }
}
