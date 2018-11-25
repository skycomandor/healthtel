import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('https://test-c9485.firebaseio.com/clients.json')
    // return this.http.get<Client[]>('./assets/db/clients.json')
      .catch(
        (error) => {
          return Observable.throw('It\'s an error here. Call your admin');
        }
      );
  }

  refreshClient(clients: Client[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    clients.sort((a, b) => {
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    });

    return this.http.put('https://test-c9485.firebaseio.com/clients.json', clients);
  }

  /*addClient(clients: Client[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put('https://test-c9485.firebaseio.com/clients.json', clients);
  }*/

  /*editClient(client: Client) {
    return this.http.put('https://test-c9485.firebaseio.com/clients.json', client);
  }*/
}
