import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Department} from '../../../../shared/_models/department';
import {DepartmentService} from '../../../../shared/_service/department.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from "rxjs";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department: Department;             // đối tượng chứa dữ liệu
  departmentFormGroup: FormGroup;     // formgroup để chứa các formcontroll
  public onClose: Subject<boolean>;

  constructor(
    private departmentService: DepartmentService,
    public bsModalRef: BsModalRef,    // thực hiện mở và đóng modal
    private formBuilder: FormBuilder, // tạo ra các formgroup và fromcontroll
  ) {

  }

  /**
   * khi submit form sẽ thực hiện lấy dữ liệu từ các formcontroll trong from và gán dữ liệu vào cho các trường dữ liệu của đối tượng
   *và thực hiện gửi lên server
   * rồi ẩn đi modal thêm bộ môn
   */
  public onSubmit(event) {
    this.department.departmentCode = this.departmentFormGroup.controls.code.value; // gán dữ liệu của các trường vào trong đối tượng
    this.department.departmentName = this.departmentFormGroup.controls.name.value;
    this.departmentService.addDepartment(this.department).subscribe(
      (data: boolean) => {
          this.onClose.next(reload);                                           // khi click submit sẽ gửi 1 biến về component list cha để check xem đã insert thành công chưa, nếu thành công là true sẽ thực hiện reload danh sách
          this.bsModalRef.hide();                                                    // ẩn đi modal thêm bộ môn
          this.department.departmentCode = '';
          this.department.departmentName = '';
      },
      error1 => {
        this.onClose.next(!reload);                                           // khi click submit sẽ gửi 1 biến về component list cha để check xem đã insert thành công chưa, nếu thành công là true sẽ thực hiện reload danh sách
        this.bsModalRef.hide();                                                    // ẩn đi modal thêm bộ môn
      }
    );
  }

  ngOnInit(): void {
    this.department = new Department();
    this.createForm();
    this.onClose = new Subject();
  }

  /**
   * Khởi tạo form
   * 1 form group sẽ chứa nhiều formcontroll là các form con
   */
  private createForm() {
    this.departmentFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      name: ['', Validators.required]
    });
  }
}
