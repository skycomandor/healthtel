import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employee: Employee;
  employees: Employee[];
  listState: boolean;
  addState: boolean;
  modalWindow: boolean;
  indexDeleteEmployee: number;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.listState = true;
    this.addState = false;
    this.modalWindow = false;
    this.employee = new Employee;
    this.employee.role = 2;
    this.employeeService.getEmployees()
      .subscribe(
        (res: Employee[]) => this.employees = res,
        (error) => this.router.navigate(['/error'])
      );
  }

  returnToStart() {
    this.router.navigate(['/main/start']);
  }

  addEmployee(newEmployee) {
    this.employees.push(newEmployee);

    this.employeeService.refreshEmployee(this.employees)
      .subscribe(
        (res) => {},
        (error) => this.router.navigate(['/error'])
      );
  }

  openDeleteWindow(i) {
    this.modalWindow = true;
    this.indexDeleteEmployee = i;
  }

  deleteEmployee() {
    this.employees.splice(this.indexDeleteEmployee, 1);
    this.employeeService.refreshEmployee(this.employees)
      .subscribe(
        (res) => {},
        (error) => this.router.navigate(['/error'])
      );
  }

}
