import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.fb.group({
    login: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.router.navigateByUrl('dashboard');
  }

}
