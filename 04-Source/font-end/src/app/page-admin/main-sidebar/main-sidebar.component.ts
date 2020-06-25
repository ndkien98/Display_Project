import { Component, OnInit } from '@angular/core';
import * as Inputmask from 'inputmask';
import * as $ from 'jquery';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html'
})
export class MainSidebarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    Inputmask().mask(document.querySelectorAll('input'));
    // tslint:disable-next-line:no-unused-expression
  }

}
