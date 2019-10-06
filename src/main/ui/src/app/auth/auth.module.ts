import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.routing';

import { SharedModule } from '../_shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InlineSVGModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
