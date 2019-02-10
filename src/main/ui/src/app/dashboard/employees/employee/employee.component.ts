import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { DashboardService } from '../../dashboard.service';
import { EmployeesService } from '../employees.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {
  public employee;
  public loading: boolean = true;

  private employeeID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeesService,
    private modal: ModalService,
    private dashService: DashboardService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeID = params.get('id');
      this.getEmployee();
    });
    this.modal.deleteModalResult$.subscribe(res => {
      if (res && res.item === 'employee' && res.navigate) {
        this.loading = true;
        this.empService.deleteEmployee(res.id).subscribe(responce => {
          if (responce) {
            this.dashService.setConfirmMsg('Пациент удалён!');
            this.clear();
          } else {
            this.dashService.setConfirmMsg('Что-то пошло не так...');
          }
          this.modal.close();
          this.navigate();
        });
      }
    });
    this.dashService.crudEvent$.subscribe(event => {
      if (event && event.msg) {
        this.loading = true;
        this.getEmployee();
        this.dashService.setConfirmMsg(event.msg);
      }
    });
  }

  public openModal(mode: string) {
    if (mode === 'delete') {
      this.modal.open({component: DeleteModalComponent});
      this.employee.role = 'employee';
      this.employee.navigate = true;
      this.dashService.setDeletedItem(this.employee);
      return;
    }
    this.modal.open({component: CreateEmployeeComponent});
    const settedMode = {
      type: mode,
      userID: this.employee.id,
      item: 'employee'
    };
    this.dashService.setMode(settedMode);
  }

  public getInitials(): string {
    return `${this.employee.lastname[0]}${this.employee.firstname[0]}`;
  }

  public navigate() {
    this.router.navigateByUrl('/dashboard/employees');
  }

  private getEmployee() {
    this.empService.getEmployeeById(this.employeeID).subscribe(employee => {
      this.employee = employee.list[0];
      console.log(this.employee)
      this.loading = false;
    });
  }

  private clear() {
    this.employee = null;
    this.employeeID = null;
    this.dashService.setDeletedItem(null);
    this.modal.setDeleteModalResult(null);
  }

}
