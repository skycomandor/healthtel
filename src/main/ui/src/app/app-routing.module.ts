import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authRoutes } from './auth/auth.routing';
import { dashboardRoutes } from './dashboard/dashboard.routing';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', children: authRoutes },
  dashboardRoutes[0],
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
