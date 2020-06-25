import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  constructor() { }
  datatableOption: DataTables.Settings = {};
  ngOnInit(): void {
    this.datatableOption = {
      pagingType: 'full_numbers',
      processing: true,
      tabIndex: 1,
      autoWidth: true,
    };
  }

}
