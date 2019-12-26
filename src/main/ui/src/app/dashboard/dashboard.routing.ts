import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'clients', loadChildren: './clients/clients.module#ClientsModule' },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
