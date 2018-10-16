import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employee[]>('https://test-c9485.firebaseio.com/employees.json')
      .map(
        res => {
          for (const employee of res) {
            switch (employee.role) {
              case 1:
                employee.role = 'Админ';
                break;
              case 2:
                employee.role = 'Доктор';
                break;
              default:
                employee.role = 'Определите роль';
            }

            employee.phone = employee.phone.toString().split('');
            employee.phone.splice(2, 0, ' ');
            employee.phone.splice(6, 0, ' ');
            employee.phone.splice(9, 0, ' ');
            employee.phone = employee.phone.join('');
          }
          return res;
        }
      )
      .catch(
        (error) => {
          return Observable.throw('It\'s an error here. Call your admin');
        }
      );
  }

  addEmployee(employee: Employee) {
    return this.http.post('https://test-c9485.firebaseio.com/employees.json', employee);
  }

  getUsers() {
    return this.http.get('http://localhost:8080/user');
  }
}
