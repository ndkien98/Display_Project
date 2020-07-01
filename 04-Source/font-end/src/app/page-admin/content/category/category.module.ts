import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryComponent} from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ]
})
export class CategoryModule { }