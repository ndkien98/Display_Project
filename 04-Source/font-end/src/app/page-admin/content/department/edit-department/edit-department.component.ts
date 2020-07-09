import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Department} from '../../../../shared/_models/department';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from "rxjs";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  department: Department;
  departmentFormGroup: FormGroup;
  public onClose: Subject<Boolean>;

  constructor(
    public departmentService: DepartmentService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
  ) {
  }

  idDepartment: string;

  ngOnInit(): void {
    this.department = new Department();
    this.createForm();
    this.onClose = new Subject();
  }

  /**
   * tạo form group trước
   * lấy id của bộ môn gửi lên serve và lấy ra thông tin của bộ môn theo id
   * set thông tin của bộ môn đấy vào form
   */
  private createForm() {
    this.departmentFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      name: ['', Validators.required]
    });
    this.departmentService.findDepartmentById(this.idDepartment).subscribe((data: Department) => {
      this.department = data;
      this.departmentFormGroup.patchValue({
        code: this.department.departmentCode,
        name: this.department.departmentName
      });
    },
      error1 => {
        alert("Lỗi load data từ server đề nghỉ reload lại trang");
        this.bsModalRef.hide();
      });
  }

  onSubmit(event: Event) {
    this.department.departmentCode = this.departmentFormGroup.controls.code.value;
    this.department.departmentName = this.departmentFormGroup.controls.name.value;
    this.departmentService.editDepartment(this.department).subscribe((data: boolean) => {
      console.log(data);
      this.bsModalRef.hide();
      this.onClose.next(reload);
    },
      error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
      }

    );
  }

}
