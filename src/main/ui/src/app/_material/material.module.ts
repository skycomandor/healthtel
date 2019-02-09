import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSortModule,
  MatTableModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
})
export class MaterialModule {}
