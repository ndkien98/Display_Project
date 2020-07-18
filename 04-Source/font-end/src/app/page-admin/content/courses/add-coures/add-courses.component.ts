import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {DataConvertSelect2} from '../../../../shared/_models/courses';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';

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
