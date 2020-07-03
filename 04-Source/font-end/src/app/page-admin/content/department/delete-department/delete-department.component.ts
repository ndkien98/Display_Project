import {Component, OnInit} from '@angular/core';
import {Department} from '../../../../shared/_models/department';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent implements OnInit {
  department: Department;
  idDepartment: string;

  constructor(
    public departmentService: DepartmentService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    this.department = new Department();
    this.setData();
  }

  setData() {
    this.departmentService.findDepartmentById(this.idDepartment).subscribe((data: Department) => {
      this.department = data;
    });
  }

  delete(event: Event) {
    const id = (event.target as Element).id;
    this.departmentService.deleteDepartment(id).subscribe((data: boolean) => {
      console.log(data);
      this.bsModalRef.hide();
    });
  }

}
