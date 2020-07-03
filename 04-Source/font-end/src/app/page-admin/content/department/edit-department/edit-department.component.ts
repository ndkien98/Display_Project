import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Department} from '../../../../shared/_models/department';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  department: Department;
  departmentFormGroup: FormGroup;

  constructor(
    public departmentService: DepartmentService,
    public bsModalRef: BsModalRef,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  idDepartment: string;

  ngOnInit(): void {
    this.department = new Department();
    this.createForm();
  }

  /**
   * tạo form group trước
   * lấy id của bộ môn gửi lên serve và lấy ra thông tin của bộ môn theo id
   * set thông tin của bộ môn đấy vào form
   */
  createForm() {
    this.departmentFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      name: ['', Validators.required]
    });
    this.departmentService.findDepartmentById(this.idDepartment).subscribe((data: Department) => {
      this.department = data;
      this.departmentFormGroup.patchValue({
        code: this.department.departmentCode,
        name: this.department.departmentName
      });
    });
  }

  onSubmit() {
    this.department.departmentCode = this.departmentFormGroup.controls.code.value;
    this.department.departmentName = this.departmentFormGroup.controls.name.value;
    this.departmentService.editDepartment(this.department).subscribe((data: boolean) => {
      this.bsModalRef.hide();
      this.router.navigateByUrl('/management/department');
    });
  }

}
