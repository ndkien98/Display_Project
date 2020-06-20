import {NgModule} from '@angular/core';
import {MainSidebarComponent} from './main-sidebar.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    MainSidebarComponent
  ],
  imports: [],
  exports: [
    MainSidebarComponent,
    CommonModule
  ]
})
export class MainSidebarModule {}
