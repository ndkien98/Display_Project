import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})

export class AddCoursesComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
  ) {
  }

  ngOnInit() {
  }
}
