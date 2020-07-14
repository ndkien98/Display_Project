import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DataTablesModule} from "angular-datatables";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BsModalRef, ModalModule} from "ngx-bootstrap/modal";
import {YearsSemestersComponent} from "./years-semesters.component";
import { AddYearsSemestersComponent } from './add-years-semesters/add-years-semesters.component';
import { EditYearsSemestersComponent } from './edit-years-semesters/edit-years-semesters.component';
import { DeleteYearsSemestersComponent } from './delete-years-semesters/delete-years-semesters.component';

@NgModule({
  declarations: [
    YearsSemestersComponent,
    AddYearsSemestersComponent,
    EditYearsSemestersComponent,
    DeleteYearsSemestersComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    ModalModule.forRoot()
  ],
  entryComponents: [],
  providers: [BsModalRef]
})

export class YearsSemestersModule {
}
