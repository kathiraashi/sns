// Default Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app.routing.module';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';

import {KeyFilterModule} from 'primeng/keyfilter';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OnlineFormComponent } from './online-form/online-form.component';
import { OnlineFormService } from './Service/online-form/online-form.service';
import { HomeService } from './Service/home/home.service';
import { OnlineExamService } from './Service/online-exam/online-exam.service';
import { OnlineExamMainComponent } from './online-exam/online-exam-main/online-exam-main.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnlineFormComponent,
    OnlineExamMainComponent
  ],
  imports: [
      // Default Modules
         BrowserModule,
         CommonModule,
         BrowserAnimationsModule,
         HttpModule,
         HttpClientModule,
         FormsModule,
         ReactiveFormsModule,
         RouterModule,
      AppRoutingModule,
      MaterialModule,
      PrimengModule,
      BsDatepickerModule.forRoot(),
      KeyFilterModule
  ],
  providers: [OnlineFormService, HomeService, OnlineExamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
