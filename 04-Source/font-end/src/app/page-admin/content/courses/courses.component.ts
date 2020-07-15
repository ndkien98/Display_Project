import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddCoursesComponent} from './add-coures/add-courses.component';
import {Courses, DataConvertSelect2} from '../../../shared/_models/courses';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {CoursesService} from '../../../shared/_service/courses.service';
import {YearsSemesterService} from '../../../shared/_service/years-semester.service';
import {YearsSemester} from '../../../shared/_models/years-semester';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  listCourses: any = [];
  listSemesterYear: any = [];
  semesterYear: string;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dataTableOptions: DataTables.Settings = {}; // tùy chọn của Datatable
  dtTrigger = new Subject();
  bsModalRef: BsModalRef;
  dataSelect2: Array<Select2OptionData>;
  option: Options;
  dataConvert: DataConvertSelect2;

  constructor(
    public modalService: BsModalService,
    public coursesService: CoursesService,
    public yearsSemesterService: YearsSemesterService
  ) {
  }

  datatableOption: DataTables.Settings = {};

  ngOnInit() {
    this.datatableOption = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.loadAllCourses();
    this.setAllYearsSemesterForSelect2();
    console.log(this.listSemesterYear);
  }

  loadAllCourses() {
    return this.coursesService.getAllCourses().subscribe((data: {}) => {
      this.listCourses = data;
      console.log(data);
    });
  }

  setAllYearsSemesterForSelect2() {
    this.option = {
      theme: 'classic',
      width: '456',
    };
    const dataArray = [];
    this.yearsSemesterService.getAllYearsSemester().subscribe((data: YearsSemester[]) => {
      data.map(yearsSemes => {
        this.semesterYear = 'Học kỳ ' + yearsSemes.semester + '- Năm học' + yearsSemes.year + '-' + yearsSemes.year + 1;
        // this.listSemesterYear.push(this.semesterYear);
        this.dataConvert = new DataConvertSelect2();
        this.dataConvert.id = yearsSemes.id;
        this.dataConvert.text = this.semesterYear;
        dataArray.push(this.dataConvert);
      });
      this.dataSelect2 = dataArray;
      console.log(this.dataSelect2);
    });

  }

  OpenModalAdd() {
    this.bsModalRef = this.modalService.show(AddCoursesComponent);
  }

}
