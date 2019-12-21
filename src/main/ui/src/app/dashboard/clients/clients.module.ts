import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from '../../_shared/shared.module';
import { MaterialModule } from '../../_material/material.module';
import { DatePickerModule } from '../../_shared/components/date-picker/date-picker.module';

import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { CreateClientComponent } from './create-client/create-client.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: ClientsComponent },
    { path: 'add-client', component: CreateClientComponent },
    { path: ':clientID', component: ClientComponent },
    { path: ':clientID/edit-client', component: CreateClientComponent },
  ]
}]

@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    CreateClientComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    MaterialModule,
    SharedModule,
    DatePickerModule
  ]
})
export class ClientsModule { }
