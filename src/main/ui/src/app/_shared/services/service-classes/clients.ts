import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageConfig } from '../../../_shared/models/common.model';
import { HtHttp } from './http';

@Injectable()
export class Client {

constructor(private http: HtHttp) {}

  getAllClients(config: PageConfig): Observable<any> {
    let searchData: string = '';
    if (config.search) {
      searchData = `lastname=${config.search}&`;
    }
    return this.http.get(`/clients?${searchData}page=${config.page}&size=${config.size}`)
  }

  getClient(id: string): Observable<any> {
    return this.http.get(`/clients?id=${id}`)
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`/clients/`, client)
  }

  updateClient(client: any): Observable<any> {
    return this.http.patch(`/clients/`, client)
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(`/clients/${id}`)
  }

}
