import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  moveToEmployeePage() {
    this.router.navigate(['main/employees']);
  }

  moveToClientsList() {
    this.router.navigate(['main/clients']);
  }

}
