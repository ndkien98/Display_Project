import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HeaderModule} from './page-admin/header/header.module';
import {MainSidebarModule} from './page-admin/main-sidebar/main-sidebar.module';
import {FooterModule} from './page-admin/footer/footer.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ContentModule} from './page-admin/content/content.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ContentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
