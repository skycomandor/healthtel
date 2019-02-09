import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { DashboardService } from '../../dashboard.service';
import { ValidationService } from 'src/app/_shared/services/validation.service';
import { getErrors } from 'src/app/_shared/utils/getErrors.util';
import { ActivatedRoute } from '@angular/router';

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
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    patronymic: ['', Validators.required],
    gender: [''],
    birthDate: ['', Validators.required],
    email: ['', ValidationService.emailValidator],
    doctor: [''],
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

  constructor(
    private modal: ModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
      email: form.email || '',
      discount: form.discount || '',
      birthDay: birthArr[0],
      birthMonth: birthArr[1],
      birthyear: birthArr[2],
      address: form.address || '',
      doctorID: form.doctor
    };
    this.mode === 'add' ? this.createClient(client) : this.updateClient(client);
  }

  public onSelect(e) {
    if (e && e.value) {
      this.clientForm.get(e.name).setValue(e.value);
    }
  }

  public onSelectDate(event) {
    if (event) {
      this.clientForm.patchValue({
        birthDate: event
      });
    }
  }

  public createPhone(): FormControl {
    return this.fb.control('', Validators.required);
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
            birthDate: `${client.birthDay}.${client.birthMonth}.${client.birthyear}`,
            email: client.email || '',
            doctor: client.doctorID || '',
            address: client.address || '',
            discount: client.discount || ''
          });
        });
      }
    });
  }

  private getEmploeeys() {
    this.clientsServ.getAllUsers().subscribe(users => {
      users = users.filter(user => user.profile === 'doctor');
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
    });
  }

  private createClient(newClient) {
    this.clientsServ.createClient(newClient).subscribe(res => {
      console.log(res);
      if (res) {
        this.dashServ.setCrudEvent({e: 'create', msg: 'Пациент создан!'});
        this.close();
      }
    });
  }

  private updateClient(client) {
    client.id = this.clientID;
    this.clientsServ.updateClient(client).subscribe(res => {});
  }

}
