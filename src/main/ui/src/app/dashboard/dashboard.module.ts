import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard.routing';

import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
