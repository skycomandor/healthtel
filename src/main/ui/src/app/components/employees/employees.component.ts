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

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.listState = true;
    this.addState = false;
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

  /*addNew() {
    if (!this.employee.lastname || !this.employee.name || !this.employee.login || !this.employee.password) {
      this.error = true;
      this.message = 'Fill in all fields, please';
    } else {
      this.error = false;
      this.employeeService.addEmployee(this.employee)
        .subscribe(
          (res) => this.state = !this.state,
          (error) => this.router.navigate(['/error'])
        );
    }
  }*/

  /*submit(form): void {
    if (form.invalid) {

      return;
    }
    this.submitted = true;
    const serviceResponse = this.userService.createUser(this.user);
    serviceResponse.subscribe(
      () => this.router.navigate([{ outlets: { popup: 'summary' }}]),
      () => console.log('Something wrong: the database error')
    );
  }*/


}
