import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubjectsComponent} from "./subjects.component";
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { EditSubjectsComponent } from './edit-subjects/edit-subjects.component';
import { DeleteSubjectsComponent } from './delete-subjects/delete-subjects.component';
import {DataTablesModule} from "angular-datatables";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsModalRef, ModalModule} from "ngx-bootstrap/modal";
import {NgSelect2Module} from "ng-select2";



@NgModule({
  declarations: [
    SubjectsComponent,
    AddSubjectsComponent,
    EditSubjectsComponent,
    DeleteSubjectsComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    ModalModule,
    ModalModule.forRoot(),
    NgSelect2Module,
    FormsModule
  ],
  providers: [BsModalRef]
})
export class SubjectsModule { }
