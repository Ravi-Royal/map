import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GMapModule } from 'primeng/gmap';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GMapModule,
    ButtonModule,
    HttpClientModule,
    DialogModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
