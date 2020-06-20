import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {HeaderModule} from '../header/header.module';
import {MainSidebarModule} from '../main-sidebar/main-sidebar.module';
import {FooterModule} from '../footer/footer.module';


@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent
  ],
  exports: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MainSidebarModule,
    FooterModule,
  ]
})
export class ContentModule {
}
