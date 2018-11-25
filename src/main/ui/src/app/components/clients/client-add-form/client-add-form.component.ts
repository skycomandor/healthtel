import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client-service/client.service';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-client-add-form',
  templateUrl: './client-add-form.component.html',
  styleUrls: ['./client-add-form.component.scss']
})
export class ClientAddFormComponent implements OnInit {
  @Output() listState = new EventEmitter<boolean>();
  @Output() closeState = new EventEmitter<boolean>();
  client: Client;
  employees: Employee[];
  errorMessage: boolean;

  constructor(private router: Router, private clientService: ClientService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.client = new Client;
    this.employeeService.getEmployees()
      .subscribe(
        (res: Employee[]) => this.employees = res,
        (error) => this.router.navigate(['/error'])
      );
  }

  changeBoolean(client) {
    this.listState.emit(client);
  }

  close() {
    this.closeState.emit(true);
  }

  addClient(form) {
    if (form.invalid) {
      this.errorMessage = true;
      return;
    }
    const value = form.value;
    const newClient = new Client;
    newClient.lastname = value.lastname;
    newClient.name = value.name;
    newClient.patronymic = value.patronymic;
    newClient.phone = value.phone;
    newClient.comment = value.comment || null;
    newClient.discount = value.discount || null;
    newClient.doctor = value.doctor || null;

    this.changeBoolean(newClient); // TODO: remove after DB connecting
    /*this.clientService.addClient(newClient)
      .subscribe(
        (res) => {

          this.changeBoolean();
        },
        (error) => this.router.navigate(['/error'])
      );*/
  }

}
