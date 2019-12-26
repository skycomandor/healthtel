import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InlineSVGModule } from 'ng-inline-svg';

import { ApiInterseptor } from './_shared/services/api.interseptor';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './_shared/shared.module';
import { MaterialModule } from './_material/material.module';

import { ApiService } from './_shared/services/api.service';
import { ModalService } from './_shared/components/modal/modal.service';

import { AppComponent } from './app.component';
import { ModalComponent } from './_shared/components/modal/modal.component';
import { DeleteModalComponent } from './dashboard/delete-modal/delete-modal.component';
import { DashboardService } from './dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InlineSVGModule,
    MaterialModule
  ],
  providers: [
    ApiService,
    ModalService,
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterseptor,
      multi: true
    }
  ],
  entryComponents: [DeleteModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
