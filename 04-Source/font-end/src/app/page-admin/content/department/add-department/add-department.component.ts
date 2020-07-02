import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Department} from '../../../../shared/_models/department';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department: Department;
  reloadParent: boolean;

  constructor(
    public departmentService: DepartmentService,
    public bsModalRef: BsModalRef,
    private router: Router,
  ) {
  }

  onSubmit() {
    this.departmentService.addDepartment(this.department).subscribe(
      (data: boolean) => {
        this.bsModalRef.hide(); // ẩn đi modal thêm bộ môn
        this.department.departmentCode = '';
        this.department.departmentName = '';
        this.router.navigateByUrl('/management/department');

      }
    );
  }

  ngOnInit(): void {
    console.log(this.reloadParent);
    this.department = new Department();
  }
}
