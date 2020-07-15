import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {CommonModule} from '@angular/common';
import {HeaderModule} from '../header/header.module';
import {MainSidebarModule} from '../main-sidebar/main-sidebar.module';
import {FooterModule} from '../footer/footer.module';
import {HomeModule} from './home/home.module';
import {RouterModule} from '@angular/router';
import {ContentRoutingModule} from './content-routing.module';
import {DecentralizationModule} from './decentralization/decentralization.module';
import {DepartmentModule} from './department/department.module';
import {CategoryModule} from './category/category.module';
import {YearsSemestersModule} from "./years-semesters/years-semesters.module";
import { SubjectsComponent } from './subjects/subjects.component';
import {SubjectsModule} from "./subjects/subjects.module";


@NgModule({
  declarations: [
    ContentComponent,
  ],
  exports: [
    ContentComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HeaderModule,
    MainSidebarModule,
    FooterModule,
    HomeModule,
    ContentRoutingModule,
    DecentralizationModule,
    DepartmentModule,
    CategoryModule,
    YearsSemestersModule,
    SubjectsModule
  ],
})
export class ContentModule {
}
