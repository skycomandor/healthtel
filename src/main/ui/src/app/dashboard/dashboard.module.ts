import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { MaterialModule } from '../_material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { DashboardService } from './dashboard.service';
import { ClientsService } from './clients/clients.service';

import { DashboardComponent } from './dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { ClientComponent } from './clients/client/client.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesService } from './employees/employees.service';
import { EmployeeComponent } from './employees/employee/employee.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientsComponent,
    DeleteModalComponent,
    CreateClientComponent,
    ClientComponent,
    EmployeesComponent,
    EmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    DashboardService,
    ClientsService,
    EmployeesService
  ],
  entryComponents: [
    CreateClientComponent,
    DeleteModalComponent,
    CreateEmployeeComponent
  ]
})
export class DashboardModule { }
