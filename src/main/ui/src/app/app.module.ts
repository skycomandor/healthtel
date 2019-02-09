import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './_shared/shared.module';
import { MaterialModule } from './_material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { ModalService } from './_shared/components/modal/modal.service';

import { baseUrl } from '../config';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InlineSVGModule,
    DashboardModule,
    MaterialModule
  ],
  providers: [
    ModalService,
    {
      provide: 'baseUrl',
      useValue: baseUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
