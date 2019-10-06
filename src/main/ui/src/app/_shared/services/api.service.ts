import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HtHttp, ErrorAlert } from './service-classes/http';
import { Client } from './service-classes/clients';
import { User } from './service-classes/user';

@Injectable()
export class ApiService {
  http: HtHttp
  error: ErrorAlert
  client: Client
  user: User

  constructor(private httpClient: HttpClient) {
    this.error = new ErrorAlert()
    this.http = new HtHttp(this.httpClient, this.error)
    this.client = new Client(this.http)
    this.user = new User(this.http)
  }
}
