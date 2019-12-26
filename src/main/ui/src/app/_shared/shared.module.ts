import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../_material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxMaskModule } from 'ngx-mask';

import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioFieldComponent } from './components/radio-field/radio-field.component';
import { ValidationService } from './services/validation.service';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    LoaderComponent,
    TextareaComponent,
    RadioFieldComponent,
    PaginatorComponent
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
    LoaderComponent,
    TextareaComponent,
    RadioFieldComponent,
    PaginatorComponent
  ],
  providers: [ValidationService]
})
export class SharedModule { }
