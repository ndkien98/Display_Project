import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../../../shared/_service/department.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  listDepartments: any = []; // mảng chứa danh sách bộ môn
  constructor(public departmentService: DepartmentService) {
  }

  dataTableOptions: DataTables.Settings = {}; // tùy chọn của Datatable
  dtTrigger = new Subject();
  STT: number;

  ngOnInit(): void {
    this.STT = 1;
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
      console.log(this.listDepartments);
      this.dtTrigger.next();
    });
  }
}
