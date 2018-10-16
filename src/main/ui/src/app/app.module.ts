import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './router/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';

import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { EmployeeService } from './services/employee-service/employee.service';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientService } from './services/client-service/client.service';
import { ClientAddFormComponent } from './components/clients/client-add-form/client-add-form.component';
import { ClientEditFormComponent } from './components/clients/client-edit-form/client-edit-form.component';
import { EmployeeAddFormComponent } from './components/employees/employee-add-form/employee-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ErrorComponent,
    HeaderPageComponent,
    HeaderComponent,
    EmployeesComponent,
    StartPageComponent,
    ClientsComponent,
    ClientAddFormComponent,
    ClientEditFormComponent,
    EmployeeAddFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    EmployeeService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
