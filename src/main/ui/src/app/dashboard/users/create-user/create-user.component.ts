import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from '../../dashboard.service';
import { ApiService } from '../../../_shared/services/api.service';
import { getErrors } from '../../../_shared/utils/getErrors.util';
import { HtTypes } from '../../../_shared/services/ht.types';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {
  mode: string = 'add';
  userID: string;
  submitted: boolean;

  positionsMock: HtTypes.common.option[] = [
    { title: 'Админ', value: 'admin' },
    { title: 'Доктор', value: 'doctor' },
  ];

  genderOptions = [
    { label: 'Муж.', value: 'm' },
    { label: 'Жен.', value: 'f' },
  ];

  userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    patronymic: ['', Validators.required],
    // birthDate: ['', Validators.required],
    gender: ['', Validators.required],
    position: [''],
    phone: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private api: ApiService,
    private dashService: DashboardService) { }

  ngOnInit() {
    this.userID = this.route.snapshot.params.userID
    if (this.userID) this.initUser()

    if (isDevMode()) {
      this.userForm.patchValue({
        firstName: environment.signUpDefault.firstName,
        lastName: environment.signUpDefault.lastName,
        patronymic: environment.signUpDefault.patronimic,
        birthDate: '07.10.1980',
        position: {title: 'Доктор', value: 'doctor'},
        phone: environment.signUpDefault.telephone,
        login: environment.signUpDefault.email,
        password: 'password'
      })
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) return
    const form = this.userForm.value;
    // const birthArr = form.birthDate.split('.');
    const user = {
      firstname: form.firstName,
      lastname: form.lastName,
      patronymic: form.patronymic,
      sex: form.gender,
      // birthDay: +birthArr[0],
      // birthMonth: +birthArr[1],
      // birthyear: +birthArr[2],
      phone: form.phone,
      profile: form.position,
      login: form.login,
      passwordHash: form.password,
      priority: 2,
    };
    this.mode === 'add' ? this.createUser(user) : this.updateUser(user);
  }

  onSelectDate(event) {
    if (event) {
      this.userForm.patchValue({
        birthDate: event
      });
    }
  }

  getErrors(field: string, fbArr?: string) {
    if (this.submitted) {
      return getErrors(field, this.userForm, fbArr);
    }
  }

  private initUser() {
    this.mode = 'edit'
    this.api.user.getUserById(this.userID).subscribe(user => {
      user = user.list[0];
      this.userForm.patchValue({
        firstName: user.firstname,
        lastName: user.lastname,
        patronymic: user.patronymic,
        gender: user.sex,
        position: this.positionsMock.find(i => i.value === user.profile) || '',
        phone: user.phone || '',
        login: user.login || '',
        password: user.passwordHash || ''
      });
      // user.birthDay ?
      //   this.userForm.get('birthDate').setValue(this.checkDate([user.birthDay, user.birthMonth]) + `.${user.birthyear}`)
      //   : this.userForm.get('birthDate').setValue('');
    })
  }

  private createUser(newUser) {
    this.api.user.createUser(newUser).subscribe(() => this.close(`Пользователь ${newUser.lastname} создан!`));
  }

  private updateUser(user) {
    user.id = this.userID;
    this.api.user.updateUser(user).subscribe(() => this.close(`Пользователь ${user.lastname} изменён!`));
  }


  private checkDate(arr) {
    arr.forEach((item, i) => {
      item = item.toString();
      if (item.length < 2) arr[i] = '0' + item
    });
    return `${arr[0]}.${arr[1]}`;
  }

  private close(text?: string) {
    this.location.back()
    if (text) this.dashService.setConfirmMsg({text, color: 'green'})
  }

}
