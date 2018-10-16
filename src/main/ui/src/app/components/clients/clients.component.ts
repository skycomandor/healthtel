import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee-service/employee.service';
import { ClientService } from '../../services/client-service/client.service';
import { Employee } from '../../models/employee';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  employees: Employee[];
  client: Client;
  clients: Client[];
  listState: boolean;
  editState: boolean;
  addState: boolean;
  comments = [];
  selectedClient: Client;

  constructor(private router: Router, private clientService: ClientService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.client = new Client;
    this.listState = true;
    this.editState = false;
    this.addState = false;
    this.employeeService.getEmployees()
      .subscribe(
        (res: Employee[]) => this.employees = res,
        (error) => this.router.navigate(['/error'])
      );
    this.clientService.getClients()
      .subscribe(
        res => this.clients = res,
        (error) => {
          console.log(error);
          this.router.navigate(['/error']);
        }
      );
  }

  returnToStart() {
    this.router.navigate(['/main/start']);
  }

  select(client) {
    this.selectedClient = client;
  }

  createCommentsArray(client): void {
    if (this.comments.includes(client)) {
      this.comments = [];
    } else {
      this.comments = [];
      this.comments.push(client);
    }
  }
}
