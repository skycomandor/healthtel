import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/:clientId', component: ClientComponent },
      { path: 'clients/:clientId/edit-client', component: CreateClientComponent },
      { path: 'create-client', component: CreateClientComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/:id', component: EmployeeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
