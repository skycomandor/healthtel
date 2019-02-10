import { Injectable, Inject } from '@angular/core';
import { ApiService } from 'src/app/_shared/services/api.service';
import { PageConfig } from 'src/app/_shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(@Inject('baseUrl') private baseUrl: string, private api: ApiService) { }

  public getAllEmployees(config: PageConfig) {
    return this.api.get(`${this.baseUrl}/employee?page=${config.page}&size=${config.size}`).map(res => {
      if (res.success) {
        return res;
      }
      return;
    });
  }
}
