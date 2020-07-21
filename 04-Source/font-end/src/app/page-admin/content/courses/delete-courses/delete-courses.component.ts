import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Courses} from "../../../../shared/_models/courses";
import {CoursesService} from "../../../../shared/_service/courses.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-delete-courses',
  templateUrl: './delete-courses.component.html',
  styleUrls: ['./delete-courses.component.css']
})
export class DeleteCoursesComponent implements OnInit {

  public onClose: Subject<boolean>;
  idCourses: any;
  courses: Courses;

  constructor(
    public coursesService: CoursesService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit() {
    this.courses = new Courses();
    this.setData();
    this.onClose = new Subject();
  }

  private setData() {
    this.coursesService.findCoursesById(this.idCourses).subscribe((data: Courses) => {
        this.courses = data;
      },
      error1 => {
        alert('Lỗi load data từ server đề nghỉ reload lại trang');
        this.bsModalRef.hide();
      });
  }

  delete() {
    this.coursesService.deleteCourses(this.idCourses).subscribe((data: boolean) => {
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
