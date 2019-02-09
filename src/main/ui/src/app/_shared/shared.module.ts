import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../_material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxMaskModule } from 'ngx-mask';

import { ModalService } from './components/modal/modal.service';
import { ApiService } from './services/api.service';

import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioFieldComponent } from './components/radio-field/radio-field.component';
import { ValidationService } from './services/validation.service';

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    ModalComponent,
    LoaderComponent,
    CalendarComponent,
    TextareaComponent,
    RadioFieldComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    NgxMaskModule.forRoot(),
    MaterialModule
  ],
  exports: [
    InputComponent,
    SelectComponent,
    ModalComponent,
    LoaderComponent,
    CalendarComponent,
    TextareaComponent,
    RadioFieldComponent
  ],
  providers: [
    ModalService,
    ApiService,
    ValidationService
  ]
})
export class SharedModule { }
