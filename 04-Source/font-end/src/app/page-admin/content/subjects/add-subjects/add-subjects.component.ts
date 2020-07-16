import {Component, OnInit} from '@angular/core';
import {Subjects} from "../../../../shared/_models/subjects";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectsService} from "../../../../shared/_service/subjects.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Select2OptionData} from "ng-select2";
import {Options} from 'select2';
import {DataConvertSelect2, reload} from "../../../../shared/_models/constant";
import {DepartmentService} from "../../../../shared/_service/department.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent implements OnInit {


  subject: Subjects;          // sử dụng để đóng modal
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
    this.subject = new Subjects();
    this.createForm();
    this.onClose = new Subject();
    this.setDataForSelect2();
  }

  public createForm() {
    this.subjectFormGroup = this.formBuilder.group({
      subjectCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      subjectName: ['', Validators.required],
      departmentCode: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.subjectFormGroup.value);
    this.subjectService.addSubjects(this.subjectFormGroup.value).subscribe( data=> {
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
      dropdownAutoWidth: true
    };
    let dataArr = [];
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      data.map(obj => {
        this.dataConvert = new DataConvertSelect2();
        this.dataConvert.id = obj.departmentCode;
        this.dataConvert.text = obj.departmentName;
        dataArr.push(this.dataConvert);
      });
      this.select2Data = dataArr;
    })
  }

}
