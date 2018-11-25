import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { ClientService } from '../../../services/client-service/client.service';
import { Employee } from '../../../models/employee';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-edit-form',
  templateUrl: './client-edit-form.component.html',
  styleUrls: ['./client-edit-form.component.scss']
})
export class ClientEditFormComponent implements OnInit {
  @Input() client: Client;
  @Input() mode: string;
  @Output() listState = new EventEmitter<boolean>();
  @Output() closeState = new EventEmitter<boolean>();
  public employees: Employee[];
  public errorMessage: boolean;
  private submited = false;

  public clientForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    patronymic: ['', Validators.required],
    lastname: ['', Validators.required],
    doctor: [''],
    comment: [''],
    phone: ['', Validators.required, Validators.minLength(9)],
    discount: [''],
  });

  constructor(
    private router: Router,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe(
        (res: Employee[]) => this.employees = res,
        (error) => this.router.navigate(['/error'])
      );

    if (this.client && this.mode === 'edit') {
      this._setClient();
    }

    if (this.mode === 'add') {
      this.clientForm.reset();
      this.client = null;
    }
  }

  public getErrors(field: string): string {
    const type = this.clientForm.controls[field].errors;
    if (this.clientForm.controls[field].invalid && type && this.submited) {
      if (type.required) {
        return 'Заполните это поле';
      }

      if (type.minlength) {
        return 'Телефон должен состоять из 9 знаков';
      }
    }
    return '';
  }

  private _setClient() {
    this.clientForm.patchValue(this.client);
  }

  changeBoolean(client) {
    this.listState.emit(client);
  }

  close() {
    this.closeState.emit(true);
  }

  onSave(form) {
    if (form.invalid) {
      this.errorMessage = true;
      console.log(form)
      return;
    }
    const newClient: Client = form.value;

    this.changeBoolean(newClient); // TODO: remove after DB connecting

    /*this.clientService.editClient(this.client)
      .subscribe(
        (res) => this.changeBoolean(),
        (error) => this.router.navigate(['/error'])
      );*/
  }
}
