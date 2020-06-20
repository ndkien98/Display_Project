import {NgModule} from '@angular/core';
import {FooterComponent} from './footer.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    CommonModule
  ]
})
export class FooterModule {}
