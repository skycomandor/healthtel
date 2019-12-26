import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HtHttp } from './http';
import { HtTypes } from '../ht.types';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(private http: HtHttp) { }

  getAllUsers(config: HtTypes.common.pageConfig): Observable<any> {
    let searchData: string = '';
    if (config.search) {
      searchData = `lastname=${config.search}&`;
    }
    return this.http.get(`/employee?${searchData}page=${config.page}&size=${config.size}`)
  }

  getUserById(id): Observable<any> {
    return this.http.get(`/employee?id=${id}`)
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`/employee/`, user)
  }

  updateUser(user: any): Observable<any> {
    return this.http.patch(`/employee/`, user)
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`/employee/${id}`)
  }
}
