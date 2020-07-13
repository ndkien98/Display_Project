import { Component, OnInit } from '@angular/core';
import {YearsSemester} from "../../../../shared/_models/years-semester";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {YearsSemesterService} from "../../../../shared/_service/years-semester.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-add-years-semesters',
  templateUrl: './add-years-semesters.component.html',
  styleUrls: ['./add-years-semesters.component.css']
})
export class AddYearsSemestersComponent implements OnInit {
  yearSemester: YearsSemester;
  yearsSemestersFormGroup: FormGroup;
  public onClose: Subject<boolean>;

  constructor(
    public yearSemesterService: YearsSemesterService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.yearSemester = new YearsSemester();
    this.onClose = new Subject();
    this.createForm();
  }

  public onSubmit(){
    this.yearSemester.year = this.yearsSemestersFormGroup.controls.year.value.split('-')[0];
    this.yearSemester.semester = this.yearsSemestersFormGroup.controls.semester.value;
    this.yearSemester.startDate = this.yearsSemestersFormGroup.controls.startDate.value;
    this.yearSemester.weeksNumber = this.yearsSemestersFormGroup.controls.weeksNumber.value;
    console.log(this.yearSemester);
    this.yearSemesterService.addYearsSemester(this.yearSemester).subscribe(
      (data: any) => {
        console.log('data : ' + data)
        this.onClose.next(reload);
        this.bsModalRef.hide();
      },
      error1 => {
        this.onClose.next(!reload);                                           // khi click submit sẽ gửi 1 biến về component list cha để check xem đã insert thành công chưa, nếu thành công là true sẽ thực hiện reload danh sách
        this.bsModalRef.hide();
      }
    )
  }

  private createForm() {
    this.yearsSemestersFormGroup = this.formBuilder.group({
      year: ['', [Validators.required]],
      semester: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      weeksNumber: ['',[Validators.required]]
    });
  }
}
