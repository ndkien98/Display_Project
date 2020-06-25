import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decentralization',
  templateUrl: './decentralization.component.html',
  styleUrls: ['./decentralization.component.css']
})
export class DecentralizationComponent implements OnInit {

  constructor() { }
  datatableOption: DataTables.Settings = {};
  ngOnInit(): void {
    this.datatableOption = {
      pagingType: 'full_numbers',
      processing: true
    };
  }

}
