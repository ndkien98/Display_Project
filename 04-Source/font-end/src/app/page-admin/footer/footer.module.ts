import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class FooterModule {}
