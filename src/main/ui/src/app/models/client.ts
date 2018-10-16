export class Client {
  name: string;
  patronymic: string;
  lastname: string;
  doctor: any;
  comment: string;
  phone: any;
  discount?: number;

  constructor(name?: string, lastname?: string) {
    this.name = name;
    this.lastname = lastname;
  }
}
