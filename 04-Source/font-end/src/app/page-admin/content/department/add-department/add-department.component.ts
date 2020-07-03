import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Department} from '../../../../shared/_models/department';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department: Department; // đối tượng chứa dữ liệu
  departmentFormGroup: FormGroup; // formgroup để chứa các formcontroll

  constructor(
    public departmentService: DepartmentService,
    public bsModalRef: BsModalRef, // thực hiện mở và đóng modal
    private router: Router,         // điều hướng component
    private formBuilder: FormBuilder // tạo ra các formgroup và fromcontroll
  ) {
  }

  /**
   * khi submit form sẽ thực hiện lấy dữ liệu từ các formcontroll trong from và gán dữ liệu vào cho các trường dữ liệu của đối tượng
   *và thực hiện gửi lên server
   * rồi ẩn đi modal thêm bộ môn
   */
  onSubmit() {
    this.department.departmentCode = this.departmentFormGroup.controls.code.value; // gán dữ liệu của các trường vào trong đối tượng
    this.department.departmentName = this.departmentFormGroup.controls.name.value;
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
    this.department = new Department();
    this.createForm();
  }

  /**
   * Khởi tạo form
   * 1 form group sẽ chứa nhiều formcontroll là các form con
   */
  createForm() {
    this.departmentFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      name: ['', Validators.required]
    });
  }
}
