import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [],
  exports: [
    HeaderComponent,
    CommonModule
  ]
})
export class HeaderModule {}
