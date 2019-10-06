import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { getErrors } from 'src/app/_shared/utils/getErrors.util';
import { Option } from 'src/app/_shared/models/common.model';
import { ApiService } from 'src/app/_shared/services/api.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass']
})
export class CreateEmployeeComponent implements OnInit {
  public mode: string;
  public employeeID: string;
  public submitted: boolean;

  public positionsMock: Option[] = [
    { title: 'Админ', value: 'admin' },
    { title: 'Доктор', value: 'doctor' },
  ];

  public genderOptions = [
    { label: 'Муж.', value: 'm' },
    { label: 'Жен.', value: 'f' },
  ];

  public employeeForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    patronymic: ['', Validators.required],
    birthDate: ['', Validators.required],
    gender: ['', Validators.required],
    position: [''],
    phone: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private modal: ModalService,
    private fb: FormBuilder,
    private dashServ: DashboardService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    const form = this.employeeForm.value;
    const birthArr = form.birthDate.split('.');
    const employee = {
      firstname: form.firstName,
      lastname: form.lastName,
      patronymic: form.patronymic,
      sex: form.gender,
      birthDay: +birthArr[0],
      birthMonth: +birthArr[1],
      birthyear: +birthArr[2],
      phone: form.phone,
      profile: form.position,
      login: form.login,
      passwordHash: form.password,
      priority: 2,
    };
    this.mode === 'add' ? this.createEmployee(employee) : this.updateEmployee(employee);
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
      if (mode && mode.item === 'employee') {
        this.employeeID = mode.userID;
        this.mode = mode.type;
        if (this.mode === 'edit') {
          this.api.user.getUserById(this.employeeID).subscribe(employee => {
            if (employee) {
              employee = employee.list[0];
              this.employeeForm.patchValue({
                firstName: employee.firstname,
                lastName: employee.lastname,
                patronymic: employee.patronymic,
                gender: employee.sex,
                position: this.positionsMock[this.returnIndexByKeyValue(employee.profile, this.positionsMock)] || '',
                phone: employee.phone || '',
                login: employee.login || '',
                password: employee.passwordHash || ''
              });
              employee.birthDay ?
                this.employeeForm.get('birthDate').setValue(this.checkDate([employee.birthDay, employee.birthMonth]) + `.${employee.birthyear}`)
                : this.employeeForm.get('birthDate').setValue('');
            }
          });
        }
      }
    });
  }

  private createEmployee(newEmployee) {
    this.api.user.createUser(newEmployee).subscribe(res => {
      if (res) {
        this.dashServ.setCrudEvent({e: 'create', msg: `Сотрудник ${newEmployee.lastname} создан!`});
        this.close();
      }
    });
  }

  private updateEmployee(employee) {
    employee.id = this.employeeID;
    this.api.user.updateUser(employee).subscribe(res => {
      if (res) {
        this.dashServ.setCrudEvent({e: 'edit', msg: `Сотрудник ${employee.lastname} изменён!`});
        this.close();
      }
    });
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

  private returnIndexByKeyValue(value: any, array: Option[]): number {
    const index = array.findIndex(item => item.value === value);
    return index;
  }

}
