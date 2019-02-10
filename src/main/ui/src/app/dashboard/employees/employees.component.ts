import { Component, OnInit, ViewChild, ElementRef, ViewChildren, HostListener } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { DashboardService } from '../dashboard.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeesService } from './employees.service';
import { PageConfig } from 'src/app/_shared/models/common.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {
  public loading: boolean;
  public isSearch: boolean;
  public isEdit: boolean;
  public activeRow: number = null;
  public employee = {};
  public employees;

  @ViewChild('searchBlock')
  public searchBlock: ElementRef;

  public dataSource: MatTableDataSource<any> = new MatTableDataSource;
  public displayedColumns = ['fullName', 'position', 'phone', 'login', 'edit'];
  @ViewChild(MatSort)
  private _sort: MatSort;
  @ViewChildren('editColumn')
  private _editColumn: ElementRef[];
  private config: PageConfig = {
    page: 1,
    size: 10,
    totalPage: null,
    search: null
  };

  constructor(
    private router: Router,
    private empService: EmployeesService,
    private modal: ModalService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this._sort;
    this.getEmployees();
    this.modal.deleteModalResult$.subscribe(res => {
      if (res && res.item === 'employee' && !res.navigate) {
        this.empService.deleteEmployee(res.id).subscribe(responce => {
          if (responce) {
            this.getEmployees();
            this.modal.close();
            this.dashService.setConfirmMsg('Сотрудник удалён!');
            this.clear();
          }
        });
      }
    });
    this.dashService.crudEvent$.subscribe(event => {
      if (event && event.msg) {
        this.getEmployees();
        this.dashService.setConfirmMsg(event.msg);
      }
    });
  }


  public onSearch(searchText: string) {
    if (searchText) {
      this.config.search = searchText;
    } else {
      this.config.search = '';
    }
    this.getEmployees();
  }

  public selectEmployee(employee) {
    this.router.navigateByUrl(`/dashboard/employees/${employee.id}`);
  }

  public openModal(mode: string, item?: any) {
    if (mode === 'delete') {
      this.modal.open({component: DeleteModalComponent});
      item.role = 'employee';
      this.dashService.setDeletedItem(item);
      return;
    }
    this.modal.open({component: CreateEmployeeComponent});
    const settedMode = {
      type: mode,
      userID: '',
      item: 'employee'
    };
    item ? settedMode.userID = item.id : settedMode.userID = '';
    this.dashService.setMode(settedMode);
  }

  public openActions(event: Event, i: number) {
    event.stopPropagation();
    this.isEdit = !this.isEdit;
    this.activeRow = i;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const notificationClickedInside: boolean = this.searchBlock.nativeElement.contains(targetElement);
    const clickedInside: boolean = this._editColumn.some(item => item.nativeElement.contains(targetElement));

    if (!notificationClickedInside) {
      this.isSearch = false;
    }
    if (!clickedInside) {
      this.isEdit = false;
    }
  }


  private getEmployees() {
    this.loading = true;
    this.empService.getAllEmployees(this.config).subscribe(employees => {
      if (employees) {
        this.employees = employees.list;
        this.dataSource.data = this.employees;
        this.loading = false;
        this.config.totalPage = employees.totalPages;
      }
    });
  }


  private clear() {
    this.dashService.setDeletedItem(null);
    this.modal.setDeleteModalResult(null);
  }

}
