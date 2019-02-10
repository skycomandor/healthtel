import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ClientsService } from './clients.service';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DashboardService } from '../dashboard.service';
import { CreateClientComponent } from './create-client/create-client.component';
import { Router } from '@angular/router';
import { PageConfig } from 'src/app/_shared/models/common.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  public loading: boolean;
  public isSearch: boolean;
  public isEdit: boolean;
  public activeRow: number = null;
  public client = {};
  public clients;
  public comments = [];

  @ViewChild('searchBlock')
  public searchBlock: ElementRef;

  public dataSource: MatTableDataSource<any> = new MatTableDataSource;
  public displayedColumns = ['fullName', 'birthdate', 'phone', 'doctor', 'discount', 'edit'];
  @ViewChild(MatSort)
  private _sort: MatSort;
  @ViewChildren('editColumn')
  private _editColumn: ElementRef[];

  private config: PageConfig = {
    page: 0,
    size: 10,
    totalPage: null
  };

  constructor(
    private router: Router,
    private clientsServ: ClientsService,
    private modal: ModalService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this._sort;
    this.getClients();
    this.modal.deleteModalResult$.subscribe(res => {
      if (res.item === 'client') {
        this.clientsServ.deleteClient(res.id).subscribe(responce => {
          if (responce) {
            this.getClients();
            this.dashService.setConfirmMsg('Пациент удалён!');
          }
        });
      }
    });
    this.dashService.crudEvent$.subscribe(event => {
      if (event && event.msg) {
        this.getClients();
        this.dashService.setConfirmMsg(event.msg);
      }
    });
  }

  public onPageChange(page: number) {
    this.config.page = page;
    this.getClients();
  }

  public selectClient(client) {
    this.router.navigateByUrl(`/dashboard/clients/${client.id}`);
  }

  public openModal(mode: string, item?: any) {
    if (mode === 'delete') {
      this.modal.open({component: DeleteModalComponent});
      item.role = 'client';
      this.dashService.setDeletedItem(item);
      return;
    }
    this.modal.open({component: CreateClientComponent});
    const settedMode = {
      type: mode,
      userID: ''
    };
    item ? settedMode.userID = item.id : settedMode.userID = '';
    this.dashService.setMode(settedMode);
  }

  public openActions(event: Event, i: number) {
    event.stopPropagation();
    this.isEdit = !this.isEdit;
    this.activeRow = i;
  }

  public createCommentsArray(client): void {
    if (this.comments.includes(client)) {
      this.comments = [];
    } else {
      this.comments = [];
      this.comments.push(client);
    }
  }

  public transformDate(number) {
    number = number.toString();
    if (number.length < 2) {
      return '0' + number;
    }

    return number;
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

  private getClients() {
    this.loading = true;
    this.clientsServ.getAllClients(this.config).subscribe(clients => {
      if (clients) {
        this.clients = clients.list;
        this.dataSource.data = this.clients;
        this.loading = false;
        this.config.totalPage = clients.totalPages;
      }
    });
  }

}
