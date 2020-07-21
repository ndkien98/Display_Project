import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {CoursesService} from "../../../shared/_service/courses.service";
import {Select2OptionData} from "ng-select2";
import {Options} from 'select2';
import {DataConvertSelect2} from "../../../shared/_models/constant";
import {YearsSemesterService} from "../../../shared/_service/years-semester.service";
import {YearsSemester} from "../../../shared/_models/years-semester";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DetailCoursesComponent} from "./detail-courses/detail-courses.component";
import {DeleteCoursesComponent} from "./delete-courses/delete-courses.component";
import {AddCoursesComponent} from "./add-courses/add-courses.component";
import {EditCoursesComponent} from "./edit-courses/edit-courses.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  listCourses: any = [];
  semesterYear: string;

  @ViewChild(DataTableDirective, {static: false}) // khai bao cac tuy chon cua dataTable
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  dataSelect2: Array<Select2OptionData>;
  option: Options;
  dataConvert: DataConvertSelect2;
  selected: boolean;

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private coursesService: CoursesService,
    private yearsSemesterService: YearsSemesterService
  ) {
  }

  ngOnInit(): void {
    this.dataTableOptions = {
      pagingType: 'full_numbers'
    };
    this.loadAllCourses();
    this.setAllYearsSemesterForSelect2();
  }

  private loadAllCourses() {
    return this.coursesService.getAllCourses().subscribe(
      (data) => {
        this.listCourses = data;
        this.dtTrigger.next();
      },
      error1 => alert("Lỗi tải data từ server, đề nghị tại lại trang")
    )
  }

  setAllYearsSemesterForSelect2() {
    this.option = {
      theme: 'classic',
      width: '100%',
      placeholder: 'Chọn học kỳ - năm học',
    };
    const dataArray = [];
    // tslint:disable-next-line:prefer-const
    this.yearsSemesterService.getAllYearsSemester().subscribe((data: YearsSemester[]) => {
      data.map(yearsSemes => {
        this.semesterYear = 'Học kỳ ' + yearsSemes.semester + ' - Năm học ' + yearsSemes.year + ' - ' + ++yearsSemes.year;
        this.dataConvert = new DataConvertSelect2();
        this.dataConvert.id = yearsSemes.id;
        this.dataConvert.text = this.semesterYear;
        dataArray.push(this.dataConvert);
      });
      this.dataSelect2 = dataArray;
    },
      error1 => {
      alert("Lỗi tải data từ serve, đề nghị tải lại trang");
      }
    );
  }

  public onChange(id: any) {
    if (id !== undefined) {
      this.coursesService.getCoursesByYearSemesterId(id).subscribe((data: {}) => {
        this.listCourses = data;
      });
    }
  }

  OpenModalDetail(event: Event) {
    const idDetail = (event.target as Element).id;
    const initialState = {
      idDetail
    };
    this.bsModalRef = this.modalService.show(DetailCoursesComponent, {initialState});
  }

  openModalAdd(){
    this.bsModalRef = this.modalService.show(AddCoursesComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.reload();
      } else if (!result){
        alert('Lớp học phần không được trùng tên và nhóm lớp và giảng viên');
      }
    })
  }

  OpenEditCourses(event: Event) {
    const id = (event.target as Element).getAttribute('name');
    const initialState = {
      idCourses: id
    };
    this.bsModalRef = this.modalService.show(EditCoursesComponent, {initialState});
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.reload();
      } else if (!result) {
        alert('Dữ liệu chỉnh sửa của lớp học phần không hợp lệ');
      }
    });

  }

  OpenModalDelete(event: Event) {
    const id = (event.target as Element).getAttribute('name');
    const initialState = {
      idCourses: id
    };
    this.bsModalRef = this.modalService.show(DeleteCoursesComponent, {initialState});

    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.reload();
      } else if (!result) {
        alert('Lớp học phần muốn xóa hiện đã có dữ liệu không thể xóa');
      }
    });
  }

  private reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.loadAllCourses();
    });

  }
}
