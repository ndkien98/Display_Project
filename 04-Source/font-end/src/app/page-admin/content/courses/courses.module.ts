import {NgModule} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {DataTablesModule} from 'angular-datatables';
import {AddCoursesComponent} from './add-coures/add-courses.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgSelect2Module} from 'ng-select2';
import {DeleteCoursesComponent} from './delete-courses/delete-courses.component';
import {DetailCoursesComponent} from './detail-courses/detail-courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    AddCoursesComponent,
    DeleteCoursesComponent,
    DetailCoursesComponent
  ],
    imports: [
        DataTablesModule,
        ModalModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ModalModule,
        ModalModule.forRoot(),
        NgSelect2Module
    ],

  exports: []
})
export class CoursesModule {
}

