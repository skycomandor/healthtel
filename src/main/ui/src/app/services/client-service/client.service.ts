import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    // return this.http.get<Client[]>('http://localhost:8080/clients')
    return this.http.get<Client[]>('./assets/db/clients.json')
      .catch(
        (error) => {
          return Observable.throw('It\'s an error here. Call your admin');
        }
      );
  }

  addClient(client: Client) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    // return this.http.post('https://test-c9485.firebaseio.com/clients.json', client);
    return this.http.post('assets/db/clients.json', client, httpOptions); // TODO: doesn't work, can't find path
  }

  editClient(client: Client) {
    return this.http.put('https://test-c9485.firebaseio.com/clients.json', client);
  }
}
