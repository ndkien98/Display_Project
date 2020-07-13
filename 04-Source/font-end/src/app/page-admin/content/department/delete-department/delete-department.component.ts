import {Component, OnInit} from '@angular/core';
import {Department} from '../../../../shared/_models/department';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {BaseService} from '../../../../shared/_service/base.service';
import {Subject} from "rxjs";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent implements OnInit {
  department: Department;
  idDepartment: string;
  public onClose: Subject<boolean>;

  constructor(
    public departmentService: DepartmentService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    this.department = new Department();
    this.setData();
    this.onClose = new Subject();
  }

  private setData() {
    this.departmentService.findDepartmentById(this.idDepartment).subscribe((data: Department) => {
      this.department = data;
    },
      error1 => {
        alert("Lỗi load data từ server đề nghỉ reload lại trang");
        this.bsModalRef.hide();
      });
  }

  delete(event: Event) {
    const id = (event.target as Element).id;
    this.departmentService.deleteDepartment(id).subscribe((data: boolean) => {
      this.onClose.next(reload);
      this.bsModalRef.hide();
    },
      error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
      }
    );
  }

}
