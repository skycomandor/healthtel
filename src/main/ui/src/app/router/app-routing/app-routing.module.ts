import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { MainComponent } from '../../components/main/main.component';
import { ErrorComponent } from '../../components/error/error.component';
import { EmployeesComponent } from '../../components/employees/employees.component';
import { StartPageComponent } from '../../components/start-page/start-page.component';
import { ClientsComponent } from '../../components/clients/clients.component';

const contentRoutes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'clients', component: ClientsComponent }
];


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, children: contentRoutes },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
