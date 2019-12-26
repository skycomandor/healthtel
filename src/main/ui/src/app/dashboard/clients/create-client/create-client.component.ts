import { Component, OnInit, OnDestroy, isDevMode} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { ValidationService } from '../../../_shared/services/validation.service';
import { getErrors } from '../../../_shared/utils/getErrors.util';
import { ApiService } from '../../../_shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HtTypes } from '../../../_shared/services/ht.types';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.sass']
})
export class CreateClientComponent implements OnInit, OnDestroy {
  submitted: boolean;
  phones: FormArray;
  mode: string = 'add';
  users = [];
  clientForm: FormGroup = this.fb.group({
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    firstName: ['', Validators.required],
    patronymic: ['', Validators.required],
    gender: [''],
    birthDate: ['', Validators.required],
    email: ['', ValidationService.emailValidator],
    doctor: [null],
    address: [''],
    discount: [''],
    phones: this.fb.array([this.createPhone()]),
    comment: ['']
  });

  genderOptions = [
    { label: 'Муж.', value: 'm' },
    { label: 'Жен.', value: 'f' },
  ];

  private clientId: string;
  private config: HtTypes.common.pageConfig = {
    page: 1,
    size: 10,
    totalPage: null
  };

  private ngUnsubscribe = new Subject()

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dashService: DashboardService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.params['clientID']
    if (this.clientId) this.initClient()
    this.getEmploeeys();

    if (isDevMode()) {
      this.clientForm.patchValue({
        firstName: environment.signUpDefault.firstName,
        lastName: environment.signUpDefault.lastName,
        patronymic: environment.signUpDefault.patronimic,
        birthDate: '07.10.1980',
        email: environment.signUpDefault.email,
        phones: [environment.signUpDefault.telephone]
      })
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  onSubmit() {
    this.submitted = true;
    if (this.clientForm.invalid) return
    const form = this.clientForm.value;
    const birthArr = form.birthDate.split('.');
    const client = {
      firstname: form.firstName,
      lastname: form.lastName,
      patronymic: form.patronymic,
      gender: form.gender,
      email: form.email,
      discount: form.discount,
      birthDay: +birthArr[0],
      birthMonth: +birthArr[1],
      birthyear: +birthArr[2],
      address: form.address,
      doctor: form.doctor || null
    }
    this.mode === 'add' ? this.createClient(client) : this.updateClient(client);
  }

  onSelectDate(event) {
    if (event) {
      this.clientForm.patchValue({
        birthDate: event
      });
    }
  }

  createPhone(): FormControl {
    return this.fb.control(''/* , Validators.required */);
  }

  addPhone() {
    this.submitted = false;
    this.phones = this.clientForm.get('phones') as FormArray;
    if (this.clientForm.get('phones').valid) {
      this.phones.push(this.createPhone());
    }
  }

  deletePhone(i) {
    if (this.phones) {
      this.phones.removeAt(i);
    }
  }

  getErrors(field: string, fbArr?: string) {
    if (this.submitted) {
      return getErrors(field, this.clientForm, fbArr);
    }
  }

  private initClient() {
    this.mode = 'edit';
    this.api.client.getClient(this.clientId).subscribe(client => {
      client = client.list[0];
      this.clientForm.patchValue({
        firstName: client.firstname,
        lastName: client.lastname,
        patronymic: client.patronymic,
        gender: client.gender,
        birthDate: this.checkDate([client.birthDay, client.birthMonth]) + `.${client.birthyear}`,
        email: client.email || '',
        address: client.address || '',
        discount: client.discount || ''
      });
      if (client.doctor) {
        this.clientForm.get('doctor')
        .setValue({
          title: `${client.doctor.lastname} ${client.doctor.firstname[0]}.${client.doctor.patronymic[0]}.`,
          value: client.doctor.id
        });
      } else {
        this.clientForm.get('doctor').setValue('');
      }
    });
  }

  private getEmploeeys() {
    this.api.user.getAllUsers(this.config).subscribe(users => {
      if (users) {
        users = users.list.filter(user => user.profile === 'doctor');
        users.forEach(user => {
          let nameFirstLetter: string;
          let patrFirstLetter: string;
          nameFirstLetter = user.firstname ? `${user.firstname[0]}.` : '';
          patrFirstLetter = user.patronymic ? `${user.patronymic[0]}.` : '';
          const userMock = {
            value: user.id,
            title: `${user.lastname} ${nameFirstLetter} ${patrFirstLetter}`
          };
          this.users.push(userMock);
        });
      }
    });
  }

  private createClient(newClient) {
    this.api.client.createClient(newClient).subscribe(() => this.close(`Пациент ${newClient.lastname} создан!`));
  }

  private updateClient(client) {
    client.id = this.clientId;
    this.api.client.updateClient(client).subscribe(() => this.close(`Пациент ${client.lastname} изменён!`));
  }

  private checkDate(arr) {
    arr.forEach((item, i) => {
      item = item.toString();
      if (item.length < 2) {
        arr[i] = '0' + item;
      }
    });
    return `${arr[0]}.${arr[1]}`;
  }

  private close(text?: string) {
    this.location.back()
    if (text) this.dashService.setConfirmMsg({text, color: 'green'})
  }

}
