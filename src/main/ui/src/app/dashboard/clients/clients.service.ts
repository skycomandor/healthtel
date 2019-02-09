import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../../_shared/services/api.service';
import { PageConfig } from 'src/app/_shared/models/common.model';

@Injectable()
export class ClientsService {

constructor(@Inject('baseUrl') private baseUrl: string, private api: ApiService) {}

  public getAllClients(config: PageConfig) {
    return this.api.get(`${this.baseUrl}/clients?page=${config.page}&size=${config.size}`).map(res => {
      if (!res.error) {
        return res;
      }
      return;
    });
  }

  public getClient(id: string) {
    return this.api.get(`${this.baseUrl}/clients?id=${id}`).map(res => {
      if (!res.error) {
        return res;
      }
      return;
    });
  }

  public createClient(client: any) {
    return this.api.post(`${this.baseUrl}/clients/`, client).map(res => {
      if (res && !res.error) {
        return res;
      }
      return;
    });
  }

  public updateClient(client: any) {
    return this.api.patch(`${this.baseUrl}/clients/`, client).map(res => {
      if (!res.error) {
        return res;
      }
      return;
    });
  }

  public deleteClient(id: any) {
    return this.api.delete(`${this.baseUrl}/clients/${id}`).map(res => {
      if (!res.error) {
        return res;
      }
      return;
    });
  }

}
