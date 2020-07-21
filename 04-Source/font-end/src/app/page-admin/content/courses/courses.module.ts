import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesComponent} from "./courses.component";
import {DataTablesModule} from "angular-datatables";
import {NgSelect2Module} from "ng-select2";
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { DeleteCoursesComponent } from './delete-courses/delete-courses.component';
import { DetailCoursesComponent } from './detail-courses/detail-courses.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CoursesComponent,
    AddCoursesComponent,
    EditCoursesComponent,
    DeleteCoursesComponent,
    DetailCoursesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgSelect2Module,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CoursesModule { }
