import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { DashboardService } from '../../dashboard.service';
import { ValidationService } from 'src/app/_shared/services/validation.service';
import { getErrors } from 'src/app/_shared/utils/getErrors.util';
import { EmployeesService } from '../../employees/employees.service';
import { PageConfig } from 'src/app/_shared/models/common.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.sass']
})
export class CreateClientComponent implements OnInit {
  public submitted: boolean;
  public phones: FormArray;
  public mode: string = 'add';
  public users = [];
  public clientForm: FormGroup = this.fb.group({
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

  public genderOptions = [
    { label: 'Муж.', value: 'm' },
    { label: 'Жен.', value: 'f' },
  ];

  private clientID: string;
  private config: PageConfig = {
    page: 1,
    size: 10,
    totalPage: null
  };

  constructor(
    private modal: ModalService,
    private fb: FormBuilder,
    private empService: EmployeesService,
    private clientsServ: ClientsService,
    private dashServ: DashboardService
  ) { }

  ngOnInit() {
    this.getEmploeeys();
    this.initialize();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.clientForm.invalid) {
      return;
    }
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
      doctor: null
    };
    form.doctor.title ?
      client.doctor = {id: form.doctor.value}
      : Number.isInteger(form.doctor) ?
        client.doctor = {id: form.doctor}
        : client.doctor = null;
    this.mode === 'add' ? this.createClient(client) : this.updateClient(client);
  }

  public onSelectDate(event) {
    if (event) {
      this.clientForm.patchValue({
        birthDate: event
      });
    }
  }

  public createPhone(): FormControl {
    return this.fb.control(''/* , Validators.required */);
  }

  public addPhone() {
    this.submitted = false;
    this.phones = this.clientForm.get('phones') as FormArray;
    if (this.clientForm.get('phones').valid) {
      this.phones.push(this.createPhone());
    }
  }

  public deletePhone(i) {
    if (this.phones) {
      this.phones.removeAt(i);
    }
  }

  public getErrors(field: string, fbArr?: string) {
    if (this.submitted) {
      return getErrors(field, this.clientForm, fbArr);
    }
  }

  public close() {
    this.modal.close();
  }

  private initialize() {
    this.dashServ.mode$.subscribe(mode => {
      if (mode && mode.item === 'client') {
        this.clientID = mode.userID;
        this.mode = mode.type;
        if (this.mode === 'edit') {
          this.clientsServ.getClient(this.clientID).subscribe(client => {
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
      }
    });
  }

  private getEmploeeys() {
    this.empService.getAllEmployees(this.config).subscribe(users => {
      if (users) {
        users = users.list.filter(user => user.profile === 'doctor');
        users.forEach(user => {
          let nameFirstLetter: string;
          let patrFirstLetter: string;
          user.firstname ? nameFirstLetter = `${user.firstname[0]}.` : nameFirstLetter = '';
          user.patronymic ? patrFirstLetter = `${user.patronymic[0]}.` : patrFirstLetter = '';
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
    this.clientsServ.createClient(newClient).subscribe(res => {
      if (res) {
        this.dashServ.setCrudEvent({e: 'create', msg: `Пациент ${newClient.lastname} создан!`});
        this.close();
      }
    });
  }

  private updateClient(client) {
    client.id = this.clientID;
    this.clientsServ.updateClient(client).subscribe(res => {
      if (res) {
        this.dashServ.setCrudEvent({e: 'edit', msg: `Пациент ${client.lastname} изменён!`});
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

}
