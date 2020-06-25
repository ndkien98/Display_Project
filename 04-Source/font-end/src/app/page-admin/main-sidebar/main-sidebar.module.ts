import {NgModule} from '@angular/core';
import {MainSidebarComponent} from './main-sidebar.component';
import {CommonModule} from '@angular/common';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import {NgxMaskModule} from 'ngx-mask';
import {MobxAngularModule} from 'mobx-angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MainSidebarComponent,
    PersonalInformationComponent
  ],
  imports: [
    FormsModule,
    RouterModule
  ],
  exports: [
    MainSidebarComponent,
    CommonModule,
    NgxMaskModule,
    MobxAngularModule,
  ]
})
export class MainSidebarModule {}
