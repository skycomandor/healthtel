import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard.routing';

import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { DashboardService } from './dashboard.service';

import { DashboardComponent } from './dashboard.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DeleteModalComponent,
    EmployeesComponent,
    EmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    DashboardService
  ],
  entryComponents: [
    DeleteModalComponent,
    CreateEmployeeComponent
  ]
})
export class DashboardModule { }
