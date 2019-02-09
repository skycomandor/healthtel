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

@NgModule({
  declarations: [
    DashboardComponent,
    ClientsComponent,
    DeleteModalComponent,
    CreateClientComponent,
    ClientComponent
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
  providers: [DashboardService, ClientsService],
  entryComponents: [
    CreateClientComponent,
    DeleteModalComponent
  ]
})
export class DashboardModule { }
