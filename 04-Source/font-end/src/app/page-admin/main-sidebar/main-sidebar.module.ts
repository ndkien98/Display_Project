import {NgModule} from '@angular/core';
import {MainSidebarComponent} from './main-sidebar.component';
import {CommonModule} from '@angular/common';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import {NgxMaskModule} from 'ngx-mask';
import {MobxAngularModule} from 'mobx-angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MainSidebarComponent,
    PersonalInformationComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    MainSidebarComponent,
    CommonModule,
    NgxMaskModule,
    MobxAngularModule,
  ]
})
export class MainSidebarModule {}
