import { Injectable, Inject } from '@angular/core';
import { ApiService } from 'src/app/_shared/services/api.service';
import { PageConfig } from 'src/app/_shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(@Inject('baseUrl') private baseUrl: string, private api: ApiService) { }

  public getAllEmployees(config: PageConfig) {
    let searchData: string = '';
    if (config.search) {
      searchData = `lastname=${config.search}&`;
    }
    return this.api.get(`${this.baseUrl}/employee?${searchData}page=${config.page}&size=${config.size}`).map(res => {
      if (res.success) {
        return res;
      }
      return;
    });
  }

  public getEmployeeById(id) {
    return this.api.get(`${this.baseUrl}/employee?id=${id}`).map(res => {
      if (res && res.success) {
        return res;
      }
      return;
    });
  }

  public createEmployee(employee: any) {
    return this.api.post(`${this.baseUrl}/employee/`, employee).map(res => {
      if (res && res.success) {
        return res;
      }
      return;
    });
  }

  public updateEmployee(employee: any) {
    return this.api.patch(`${this.baseUrl}/employee/`, employee).map(res => {
      if (res && res.success) {
        return res;
      }
      return;
    });
  }

  public deleteEmployee(id) {
    return this.api.delete(`${this.baseUrl}/employee/${id}`).map(res => {
      if (res && res.success && !res.error) {
        return res;
      }
      return;
    });
  }
}
