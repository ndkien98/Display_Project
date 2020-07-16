import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataConvertSelect2, Subjects} from "../../../../shared/_models/subjects";
import {Select2OptionData} from "ng-select2";
import {SubjectsService} from "../../../../shared/_service/subjects.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {DepartmentService} from "../../../../shared/_service/department.service";
import {Subject} from "rxjs";
import {reload} from "../../../../shared/_models/constant";
import {Options} from 'select2';

@Component({
  selector: 'app-edit-subjects',
  templateUrl: './edit-subjects.component.html',
  styleUrls: ['./edit-subjects.component.css']
})
export class EditSubjectsComponent implements OnInit {

  // @ts-ignore
  idsubject: any;          // data được gửi từ bên phia
  subject: Subjects;
  subjectFormGroup: FormGroup; // tạo ra form group tổng
  // @ts-ignore
  public onClose: Subjects<boolean>; // đóng modal

  public select2Data: Array<Select2OptionData>; // data chính đổ vào select 2
  public options: Options;                        // option của select 2
  private dataConvert: DataConvertSelect2;       // dữ liệu đệm tạm để chuyển data từ api -> select2Data

  constructor(
    private subjectService: SubjectsService,      // service của subjects
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    private departmentService: DepartmentService  // service cua department
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.subject = new Subjects();
    this.onClose = new Subject();
    this.setDataForSelect2();
  }

  public createForm() {
    console.log(this.idsubject);
    this.subjectFormGroup = this.formBuilder.group({
      subjectCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      subjectName: ['', Validators.required],
      departmentCode: ['', Validators.required]
    });
    this.subjectService.findSubjectsById(this.idsubject).subscribe((data: Subjects) => {
        this.subject = data;
        this.subjectFormGroup.patchValue({
          subjectCode: this.subject.subjectCode,
          subjectName: this.subject.subjectName,
          departmentCode: this.subject.departmentCode
        })
      },
      error1 => {
        alert("Lỗi tải data đề nghị tải lại trang");
        this.onClose.next(reload);
        this.bsModalRef.hide();
        this.subjectFormGroup.reset();
      }
    )

  }

  onSubmit() {
    console.log(this.subjectFormGroup.value);
    this.subjectService.editSubject(this.subjectFormGroup.value, this.idsubject).subscribe(data => {
        this.onClose.next(reload);
        this.bsModalRef.hide();
        this.subjectFormGroup.reset();
      },
      error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
        this.subjectFormGroup.reset();
      }
    )

  }

  private setDataForSelect2() {
    this.options = {
      theme: 'classic',
      width: '100%',
      placeholder: 'Chọn tên bộ môn',
      dropdownAutoWidth: true,
    };
    let dataArr = [];
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      data.map(obj => {
          this.dataConvert = new DataConvertSelect2();
          this.dataConvert.id = obj.departmentCode;
          this.dataConvert.text = obj.departmentName;
          dataArr.push(this.dataConvert);
        }, error => {
          alert(" Lỗi serve, đề nghị tải lại trang");
          this.bsModalRef.hide();
        }
      );
      this.select2Data = dataArr;
    })
  }
}

