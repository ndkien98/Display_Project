import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal";
import {reload} from "../../../../shared/_models/constant";
import {SubjectsService} from "../../../../shared/_service/subjects.service";

@Component({
  selector: 'app-delete-subjects',
  templateUrl: './delete-subjects.component.html',
  styleUrls: ['./delete-subjects.component.css']
})
export class DeleteSubjectsComponent implements OnInit {

  subjectName: any;
  idSubject: any;
  public onClose: Subject<boolean>;

  constructor(
    public subjectService: SubjectsService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    console.log(this.subjectName);
    this.setDate();
  }

  setDate() {
    this.subjectService.findSubjectsById(this.idSubject).subscribe((data) => {
        this.subjectName = data.subjectName;
      }, error => {
        alert("Lỗi tải data từ serve, đề nghị tải lại trang");
        this.bsModalRef.hide();
      }
    );
  }

  delete() {
    this.subjectService.deleteSubjects(this.idSubject).subscribe((data: boolean) => {
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
