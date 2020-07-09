import { Component, OnInit } from '@angular/core';
import {YearsSemester} from "../../../../shared/_models/years-semester";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {YearsSemesterService} from "../../../../shared/_service/years-semester.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-edit-years-semesters',
  templateUrl: './edit-years-semesters.component.html',
  styleUrls: ['./edit-years-semesters.component.css']
})
export class EditYearsSemestersComponent implements OnInit {

  yearSemester: YearsSemester;
  yearsSemestersFormGroup: FormGroup;
  public onClose: Subject<boolean>;

  idYearSemester: any;

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
        this.onClose.next(!reload);
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
    console.log("idYearSemester : " + this.idYearSemester);
    this.yearSemesterService.findYearsSemesterById(this.idYearSemester).subscribe(
      (data: any) => {
        this.yearSemester = data;
        this.yearsSemestersFormGroup.patchValue({
          year: `${this.yearSemester.year}` + `-` + `${this.yearSemester.year + 1}`,
          semester: this.yearSemester.semester,
          startDate: this.yearSemester.startDate,
          weeksNumber: this.yearSemester.weeksNumber
        })
      },
      error1 => {
        alert("Lỗi load data từ server đề nghỉ reload lại trang");
        this.bsModalRef.hide();
      }
    )
  }

}
