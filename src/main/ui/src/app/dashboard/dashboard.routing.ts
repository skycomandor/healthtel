import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';

export const dashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/:id', component: ClientComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/:id', component: EmployeeComponent },
    ]
  }
];
