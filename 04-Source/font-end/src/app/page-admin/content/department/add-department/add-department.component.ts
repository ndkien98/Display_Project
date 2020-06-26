import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../shared/_models/department';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  submitted = false;
  department: Department;

  constructor() { }

  onSubmit() {
    this.submitted = true;
  }
  ngOnInit(): void {
    this.department = new Department();
  }

}
