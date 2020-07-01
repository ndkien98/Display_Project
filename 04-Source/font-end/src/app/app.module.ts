import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ContentModule} from './page-admin/content/content.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {HeaderModule} from './page-admin/header/header.module';
import {FooterModule} from './page-admin/footer/footer.module';
import {MainSidebarModule} from './page-admin/main-sidebar/main-sidebar.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HeaderModule,
    FooterModule,
    MainSidebarModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
