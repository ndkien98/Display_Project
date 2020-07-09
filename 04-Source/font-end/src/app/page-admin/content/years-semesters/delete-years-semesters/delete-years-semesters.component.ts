import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";
import {YearsSemester} from "../../../../shared/_models/years-semester";
import {YearsSemesterService} from "../../../../shared/_service/years-semester.service";

@Component({
  selector: 'app-delete-years-semesters',
  templateUrl: './delete-years-semesters.component.html',
  styleUrls: ['./delete-years-semesters.component.css']
})
export class DeleteYearsSemestersComponent implements OnInit {
  yearSemester: YearsSemester;
  idYearSemester: any;
  public onClose: Subject<boolean>;

  constructor(
    public yearSemesterService: YearsSemesterService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    this.yearSemester = new YearsSemester();
    this.setData();
    this.onClose = new Subject();
  }

  private setData() {
    this.yearSemesterService.findYearsSemesterById(this.idYearSemester).subscribe((data: YearsSemester) => {
      this.yearSemester = data;
    },
      error1 => {
        alert("Lỗi load data từ server đề nghỉ reload lại trang");
        this.bsModalRef.hide();
      })
  }

  delete() {
    this.yearSemesterService.deleteYearsSemester(this.idYearSemester).subscribe((data: boolean) => {
      this.onClose.next(reload);
      this.bsModalRef.hide();
    },
      error => {
          this.onClose.next(!reload);
          this.bsModalRef.hide();
      },
      () => console.log('null')
    );
  }
}
