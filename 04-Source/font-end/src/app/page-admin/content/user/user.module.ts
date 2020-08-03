import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import {RouterModule} from "@angular/router";
import {DataTablesModule} from "angular-datatables";
import {NgSelect2Module} from "ng-select2";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UiSwitchModule} from "ngx-ui-switch";



@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    NgSelect2Module,
    ReactiveFormsModule,
    UiSwitchModule,
  ]
})
export class UserModule { }
