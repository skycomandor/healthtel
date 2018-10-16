import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { ClientService } from '../../../services/client-service/client.service';
import { Employee } from '../../../models/employee';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-edit-form',
  templateUrl: './client-edit-form.component.html',
  styleUrls: ['./client-edit-form.component.scss']
})
export class ClientEditFormComponent implements OnInit {
  @Input() client: Client;
  @Output() listState = new EventEmitter<boolean>();
  employees: Employee[];

  constructor(private router: Router, private clientService: ClientService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe(
        (res: Employee[]) => this.employees = res,
        (error) => this.router.navigate(['/error'])
      );
  }

  changeBoolean() {
    this.listState.emit(true);
  }

  editClient(form) {
    this.changeBoolean();  // TODO: remove after DB connecting
    const value = form.value;

    /*this.clientService.editClient(this.client)
      .subscribe(
        (res) => this.changeBoolean(),
        (error) => this.router.navigate(['/error'])
      );*/
  }
}
