import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../shared/_models/courses";
import {CoursesService} from "../../../../shared/_service/courses.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-detail-courses',
  templateUrl: './detail-courses.component.html',
  styleUrls: ['./detail-courses.component.css']
})
export class DetailCoursesComponent implements OnInit {
  courses: Courses;
  idDetail: any;

  constructor(
    public coursesService: CoursesService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit() {
    this.courses = new Courses();
    this.setData();
  }

  private setData() {
    this.coursesService.findCoursesById(this.idDetail).subscribe((data: Courses) => {
        this.courses = data;
      },
      error1 => {
        alert('Lỗi load data từ server đề nghỉ reload lại trang');
        this.bsModalRef.hide();
      });
  }

}
