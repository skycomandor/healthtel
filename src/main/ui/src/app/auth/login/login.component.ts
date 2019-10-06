import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    login: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('dashboard');
  }

}
