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

  employee: Employee;
  errorMessage: boolean;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee;
  }

  changeBoolean() {
    this.listState.emit(true);
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
    newEmployee.patronymic = value.patronymic;
    newEmployee.phone = value.phone;
    newEmployee.login = value.comment;
    newEmployee.password = value.discount;
    newEmployee.role = value.doctor;

    this.changeBoolean(); // TODO: remove after DB connecting
    /*this.employeeService.addEmployee(newEmployee)
      .subscribe(
        (res) => this.changeBoolean(),
        (error) => this.router.navigate(['/error'])
      );*/
  }

}
