import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepartmentComponent} from './department.component';
import {AddDepartmentComponent} from './add-department/add-department.component';
import {EditDepartmentComponent} from './edit-department/edit-department.component';
import {DeleteDepartmentComponent} from './delete-department/delete-department.component';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [AddDepartmentComponent],
  providers: [BsModalRef]
})
export class DepartmentModule {
}
