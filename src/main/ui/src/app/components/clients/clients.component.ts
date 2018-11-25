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
  public mode: string;
  modalWindow: boolean;
  searchState: boolean;
  comments = [];
  selectedClient: Client;
  indexEditClient: number;
  indexDeleteClient: number;

  searchName = '';

  constructor(private router: Router, private clientService: ClientService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.client = new Client;
    this.mode = '';
    this.modalWindow = false;
    this.searchState = false;
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

  select(client, index) {
    this.mode = 'edit';
    this.selectedClient = client;
    this.indexEditClient = index;
  }

  createCommentsArray(client): void {
    if (this.comments.includes(client)) {
      this.comments = [];
    } else {
      this.comments = [];
      this.comments.push(client);
    }
  }

  addClient(newClient) {
    this.clients.push(newClient);
      this.clientService.refreshClient(this.clients)
        .subscribe(
          (res) => {},
          (error) => this.router.navigate(['/error'])
        );
  }

  openDeleteWindow(i) {
    this.modalWindow = true;
    this.indexDeleteClient = i;
  }

  deleteClient() {
    this.clients.splice(this.indexDeleteClient, 1);
    this.clientService.refreshClient(this.clients)
      .subscribe(
        (res) => {},
        (error) => this.router.navigate(['/error'])
      );
  }

  editClient(client) {
    this.clients.splice(this.indexEditClient, 1, client);
    console.log(this.clients);
    this.clientService.refreshClient(this.clients)
      .subscribe(
        (res) => {},
        (error) => this.router.navigate(['/error'])
      );
  }
}
