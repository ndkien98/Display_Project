import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Select2OptionData} from "ng-select2";
import {Options} from 'select2';
import {DataConvertSelect2, ID_ROLE_LECTURE, ID_ROLE_STUDENT} from "../../../../shared/_models/constant";
import {DepartmentService} from "../../../../shared/_service/department.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public dataForSelect2Role: Array<Select2OptionData>;
  public dataForSelect2Department: Array<Select2OptionData>;
  public options: Options;
  public dataConvert: DataConvertSelect2;

  userFormGroup: FormGroup;

  public onClose: Subject<boolean>;

  bsModalRef: BsModalRef;

  checkSelectRole: any;
  departments: any;
  gender: any;
  STUDENT = ID_ROLE_STUDENT;
  LECTURE = ID_ROLE_LECTURE;

  constructor(
    private formBuilder: FormBuilder,
    private departemtnService: DepartmentService
  ) {
  }

  ngOnInit(): void {
    this.checkSelectRole = 0;
    console.log(this.checkSelectRole);
    this.setOptionSelect2();
    this.onClose = new Subject();
    this.createForm();
  }


  setOptionSelect2() {
    // set option for role
    this.options = {
      theme: 'classic',
      width: '100%',
    };
    this.dataForSelect2Role = [
      {
        id: this.STUDENT + "",
        text: 'Sinh viên'
      },
      {
        id: this.LECTURE + "",
        text: 'Giảng viên'
      }
    ];
    let datas = [];
    // set option for department
    this.departemtnService.getAllDepartment().subscribe((data: any) => {
        this.departments = data;
        data.map(object => {
          this.dataConvert = new DataConvertSelect2(object.departmentCode, object.departmentName);
          datas.push(this.dataConvert);
        });
        this.dataForSelect2Department = datas;
      }, error1 => {
        alert("Lỗi khi lấy dữ liệu bộ môn, Đề nghị tải lại trang");
        this.bsModalRef.hide();
      }
    )
  }

  createForm() {
    this.userFormGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      fullname: ["", Validators.required],
      birthDate: ["", Validators.required],
      emailAddress: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      roleId: ["", Validators.required],
      address: ["", Validators.required]
    });
  }

  onChangeRole(role: any) {
    if (role == this.STUDENT + "") this.checkSelectRole = this.STUDENT;
    else if (role == this.LECTURE + "") this.checkSelectRole = this.LECTURE;
    console.log(this.checkSelectRole);
    this.userFormGroup.patchValue({
      username: "",
      address: ""
    })
  }

  onChangeGender(event: Event) {
    this.gender = (event.target as Element).getAttribute("value");
  }

  onSubmit() {
    console.log(this.gender);
    console.log(this.userFormGroup.value);
  }
}
