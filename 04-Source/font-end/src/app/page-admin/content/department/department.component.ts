import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../../../shared/_service/department.service';
import {Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddDepartmentComponent} from './add-department/add-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  listDepartments: any = []; // mảng chứa danh sách bộ môn

  dataTableOptions: DataTables.Settings = {}; // tùy chọn của Datatable
  dtTrigger = new Subject();
  bsModalRef: BsModalRef;

  constructor(
    public departmentService: DepartmentService,
    public modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions = {
      pagingType: 'full_numbers',
    };
    this.loadAllDepartment();
  }

  /**
   * - call api từ service để nhận được mảng bộ môn
   * - thực hiện load data lên datatable
   */
  loadAllDepartment() {
    return this.departmentService.getAllDepartment().subscribe((data: {}) => {
      this.listDepartments = data;
      this.dtTrigger.next();
    });
  }

  openModalAdd() {
    const initialState = { // dùng để call mở modal thêm bộ môn
      reloadParent: false
    };
    this.bsModalRef = this.modalService.show(AddDepartmentComponent, {initialState});
  }


}
