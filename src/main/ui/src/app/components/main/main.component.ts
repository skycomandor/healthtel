import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users = [
    {
      name: 'Anton',
      age: 25
    },
    {
      name: 'Max',
      age: 30
    }
  ];

  // data: User[];
  // data2: User;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
  }


  /*onSave(name, age, phone): void {
    const user = [{
      name: name,
      age: +age,
      phone: +phone
    }];
    this.servereServese.storeServ(user)
      .subscribe(
        (res) => console.log(res),
        (error) => this.router.navigate(['/error'])
      );
  }*/

  /*onGet(): void {
    this.employeeService.getUsers()
      .subscribe(
        (res: User) => this.data2 = res,
            (error) => this.router.navigate(['/error'])
    );
  }*/
}
