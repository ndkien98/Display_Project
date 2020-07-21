import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../shared/_models/courses";
import {Subject} from "rxjs";
import {Select2OptionData} from "ng-select2";
import {Options} from 'select2';
import {DataConvertSelect2, reload} from "../../../../shared/_models/constant";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoursesService} from "../../../../shared/_service/courses.service";
import {SubjectsService} from "../../../../shared/_service/subjects.service";
import {UserService} from "../../../../shared/_service/user.service";
import {YearsSemesterService} from "../../../../shared/_service/years-semester.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {

  subjects: any = [];       // danh sách môn học từ api
  lecturers: any = [];      // danh sách giáo viên từ api
  subjectName: string;      // tên môn học khi thực hiện chọn mã môn học
  lectureName: string;       // tên giảng viên khi thực hiện chọn mã giảng viên
  idCourses: any;             // id được gửi từ component cha
  courses: Courses;           // courses được lấy ra từ datab

  public onClose: Subject<boolean>;   // là đối tượng observable được theo giõi từ component cha để nắng nghe sự kiện khi close modal

  dataSelect2CodeSubject: Array<Select2OptionData>;   // chứa data đưa lên select 2
  optionSelect2: Options;                               // option cấu hình của select 2
  dataSelect2CodeLecture: Array<Select2OptionData>;
  dataSelect2YearsSemester: Array<Select2OptionData>;
  dataConvert: DataConvertSelect2;                      // đối tượng được tạo ra đóng vai trò chuyển đổi dữ liệu để đưa vào select 2

  courseFormGroup: FormGroup;                           // tạo ra form tổng thể chứa tất cả


  constructor(
    private cousesService: CoursesService,
    private subjectService: SubjectsService,
    private userService: UserService,
    private yearsSemesterService: YearsSemesterService,
    public bsModalRef: BsModalRef,                    // thực hiện thao tác với modal
    public formBuilder: FormBuilder,                  // xây dựng ra form group
  ) {
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.setData();
    this.createForm();
  }

  private setData() {
    let dataAdapterArray = [];
    this.optionSelect2 = {
      theme: 'classic',
      width: '100%',
    };
    // @ts-ignore
    this.setDataSelect2Subjects(dataAdapterArray, this.dataConvert);
    dataAdapterArray = [];
    // @ts-ignore
    this.setDataSelect2Lecturers(dataAdapterArray, this.dataConvert);
    dataAdapterArray = [];
    // @ts-ignore
    this.setDataSelect2Sermesters(dataAdapterArray, this.dataConvert);
    dataAdapterArray = [];

  }

  private createForm() {
    this.courseFormGroup = this.formBuilder.group({
      subjectCode: ['', [Validators.required]],
      subjectGroup: ['', [Validators.required]],
      classCode: ['', [Validators.required]],
      yearSemesterId: ['', [Validators.required]],
      lecturerCode: ['', [Validators.required]],
    })
    this.cousesService.findCoursesById(this.idCourses).subscribe((data: any) => {
        this.courses = data;
        this.courseFormGroup.patchValue({
          subjectCode: this.courses.subjectCode,
          subjectGroup: this.courses.subjectGroup,
          yearSemesterId: this.courses.yearSemesterId,
          lecturerCode: this.courses.lecturerCode,
          classCode: this.courses.classCode
        });
        this.subjectName = this.courses.subjectName;
        this.lectureName = this.courses.lecturerName
      }, error1 => {
        alert("Lỗi tải data từ server, đề nghị tải lại trang")
      }
    )
  }

  public onSubmit() {
    this.cousesService.editCourse(this.courseFormGroup.value, this.idCourses).subscribe((data: any) => {
        this.onClose.next(reload);
        this.bsModalRef.hide();
      }, error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
      }
    )

  }

  onChangeCodeSubject(subjectCode: any) {
    if (subjectCode !== undefined) {
      this.subjects.map(subject => {
        if (subject.subjectCode == subjectCode) {
          this.subjectName = subject.subjectName;
        }
      })
    }
  }

  onChangeCodeLecture(lectureCode: any) {
    if (lectureCode !== undefined) {
      this.lecturers.map(lecture => {
        if (lecture.username == String(lectureCode)) {
          this.lectureName = lecture.fullName;
        }
      })
    }
  }

  private setDataSelect2Subjects(dataAdapterArray: [], dataConvert) {
    this.subjectService.getSubjects().subscribe((data: any) => {
        this.subjects = data;
        data.map(subject => {
          dataConvert = new DataConvertSelect2();
          dataConvert.id = subject.subjectCode;
          dataConvert.text = subject.subjectCode;
          // @ts-ignore
          dataAdapterArray.push(dataConvert);
        });
        this.dataSelect2CodeSubject = dataAdapterArray;
      }, error1 => {
        alert("Lỗi tải data từ serve, đề nghị tải lại trang");
      }
    );
  }

  private setDataSelect2Lecturers(dataAdapterArray: [], dataConvert) {
    this.userService.getLectures().subscribe((data: any) => {
        this.lecturers = data;
        data.map(lecture => {
          dataConvert = new DataConvertSelect2();
          dataConvert.id = lecture.username;
          dataConvert.text = lecture.username;
          // @ts-ignore
          dataAdapterArray.push(dataConvert);
        });
        this.dataSelect2CodeLecture = dataAdapterArray;
      }, error1 => {
        alert("Lỗi tải data từ serve, đề nghị tải lại trang");
      }
    );
  }

  private setDataSelect2Sermesters(dataAdapterArray: [], dataConvert) {
    this.yearsSemesterService.getAllYearsSemester().subscribe((data: any) => {
        data.map(yearsSemes => {
          dataConvert = new DataConvertSelect2();
          dataConvert.id = yearsSemes.id;
          dataConvert.text = 'Học kỳ ' + yearsSemes.semester + ' - Năm học ' + yearsSemes.year + ' - ' + ++yearsSemes.year;
          // @ts-ignore
          dataAdapterArray.push(dataConvert);
        });
        this.dataSelect2YearsSemester = dataAdapterArray;
      }, error1 => {
        alert("Lỗi tải data từ serve, đề nghị tải lại trang");
      }
    )
  }

}
