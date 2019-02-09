import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { ValidationService } from 'src/app/_shared/services/validation.service';
import { getErrors } from 'src/app/_shared/utils/getErrors.util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass']
})
export class CreateEmployeeComponent implements OnInit {
  public mode: string;
  public employeeID: string;
  public submitted: boolean;

  public positionsMock = [
    { title: 'Админ', value: 1 },
    { title: 'Доктор', value: 2 },
  ];

  public employeeForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    patronymic: ['', Validators.required],
    birthDate: [''],
    email: ['', ValidationService.emailValidator],
    position: [''],
    phone: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private modal: ModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dashServ: DashboardService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  public onSelectDate(event) {
    if (event) {
      this.employeeForm.patchValue({
        birthDate: event
      });
    }
  }

  public getErrors(field: string, fbArr?: string) {
    if (this.submitted) {
      return getErrors(field, this.employeeForm, fbArr);
    }
  }

  public close() {
    this.modal.close();
  }

  private initialize() {
    this.dashServ.mode$.subscribe(mode => {
      this.employeeID = mode.userID;
      this.mode = mode.type;
      if (this.mode === 'edit') {
        // this.clientsServ.getClient(this.clientID).subscribe(client => {
        //   client = client.list[0];
        //   this.clientForm.patchValue({
        //     firstName: client.firstname,
        //     lastName: client.lastname,
        //     patronymic: client.patronymic,
        //     gender: client.gender,
        //     birthDate: `${client.birthDay}.${client.birthMonth}.${client.birthyear}`,
        //     email: client.email || '',
        //     doctor: client.doctorID || '',
        //     address: client.address || '',
        //     discount: client.discount || ''
        //   });
        // });
      }
    });
  }

}
