import {NgModule} from '@angular/core';
import {DecentralizationComponent} from './decentralization.component';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';


@NgModule({
  declarations: [
    DecentralizationComponent,
    AddRoleComponent,
    EditRoleComponent,
    DeleteRoleComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports: []
})
export class DecentralizationModule {
}
