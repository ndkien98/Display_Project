import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal";
import {UserService} from "../../../../shared/_service/user.service";
import {Lecturer, Student, User} from "../../../../shared/_models/user";
import {reload} from "../../../../shared/_models/constant";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  public onClose: Subject<boolean>;

  idUser: any;
  idRole: any;
  user: any;
  avatar;

  constructor(
    private userService: UserService,
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.setData();
  }

  setData() {
    if (this.idRole == 2){
      this.user = new Lecturer();
      this.userService.getLectureById(this.idUser).subscribe((data: any) => {
        this.user = data;
      }, error1 => {
          this.onClose.next(!reload);
          this.bsModalRef.hide();
        }
      );
    }else if (this.idRole == 3) {
      this.user = new Student();
      this.userService.getStudentById(this.idUser).subscribe((data: any) => {
        this.user = data;
      }, error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
      })
    }else {
      this.user = new User();
      this.userService.getUserById(this.idUser).subscribe((data: any) => {
        this.user = data;
      }, error1 => {
        this.onClose.next(!reload);
        this.bsModalRef.hide();
      })
    }
  }

}
