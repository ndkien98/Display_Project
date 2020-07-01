import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DepartmentComponent} from './department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ]
})
export class DepartmentModule { }