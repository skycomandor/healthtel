import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable()
export class ServereService {

  constructor(private http: HttpClient) { }

  storeServ (users: User[]) {
    // return this.http.post('https://test-c9485.firebaseio.com/data.json', users);
    return this.http.put('https://test-c9485.firebaseio.com/data.json', users);
  }

  getUsers() {
    return this.http.get<User[]>('https://test-c9485.firebaseio.com/data.json')
      .catch(
        (error) => {
          return Observable.throw('It\'s an error here. Call your admin');
        }
      );
  }
}
