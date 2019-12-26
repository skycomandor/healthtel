import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from '../../_shared/shared.module';
import { MaterialModule } from '../../_material/material.module';
import { DatePickerModule } from '../../_shared/components/date-picker/date-picker.module';

import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: UsersComponent },
    { path: 'add-user', component: CreateUserComponent },
    { path: ':userID', component: UserComponent },
    { path: ':userID/edit-user', component: CreateUserComponent },
    { path: '**', redirectTo: '' }
  ]
}]

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    CreateUserComponent
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

export class UsersModule { }
