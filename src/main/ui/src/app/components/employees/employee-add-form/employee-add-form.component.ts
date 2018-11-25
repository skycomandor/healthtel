import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-add-form',
  templateUrl: './employee-add-form.component.html',
  styleUrls: ['./employee-add-form.component.scss']
})
export class EmployeeAddFormComponent implements OnInit {
  @Output() listState = new EventEmitter<boolean>();
  @Output() closeState = new EventEmitter<boolean>();

  employee: Employee;
  errorMessage: boolean;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee;
  }

  changeBoolean(newEmployee) {
    this.listState.emit(newEmployee);
  }

  close() {
    this.closeState.emit(true);
  }

  addEmployee(form) {
    if (form.invalid) {
      this.errorMessage = true;
      return;
    }
    const value = form.value;
    const newEmployee = new Employee;
    newEmployee.lastname = value.lastname;
    newEmployee.name = value.name;
    newEmployee.patronymic = value.patronymic || null;
    newEmployee.phone = value.phone || null;
    newEmployee.login = value.login;
    newEmployee.password = value.password;
    newEmployee.role = value.role;

    this.changeBoolean(newEmployee); // TODO: remove after DB connecting
    /*this.employeeService.addEmployee(newEmployee)
      .subscribe(
        (res) => this.changeBoolean(),
        (error) => this.router.navigate(['/error'])
      );*/
  }

}
