import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DashboardService } from '../dashboard.service';
import { CreateClientComponent } from './create-client/create-client.component';
import { Router } from '@angular/router';
import { PageConfig } from 'src/app/_shared/models/common.model';
import { ApiService } from 'src/app/_shared/services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  loading: boolean;
  isSearch: boolean;
  isEdit: boolean;
  activeRow: number = null;
  client = {};
  clients;
  comments = [];

  @ViewChild('searchBlock')
  searchBlock: ElementRef;

  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  displayedColumns = ['fullName', 'birthdate', 'phone', 'doctor', 'discount', 'edit'];
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
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this._sort;
    this.getClients();
    this.modal.deleteModalResult$.subscribe(res => {
      if (res && res.item === 'client' && !res.navigate) {
        this.api.client.deleteClient(res.id).subscribe(responce => {
          if (responce) {
            this.getClients();
            this.modal.close();
            this.dashService.setConfirmMsg('Пациент удалён!');
            this.clear();
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

  onSearch(searchText: string) {
    if (searchText) {
      this.config.search = searchText;
    } else {
      this.config.search = '';
    }
    this.getClients();
  }

  onPageChange(page: number) {
    this.config.page = page;
    this.getClients();
  }

  selectClient(client) {
    this.router.navigateByUrl(`/dashboard/clients/${client.id}`);
  }

  openModal(mode: string, item?: any) {
    if (mode === 'delete') {
      this.modal.open({component: DeleteModalComponent});
      item.role = 'client';
      this.dashService.setDeletedItem(item);
      return;
    }
    this.modal.open({component: CreateClientComponent});
    const settedMode = {
      type: mode,
      userID: '',
      item: 'client'
    };
    item ? settedMode.userID = item.id : settedMode.userID = '';
    this.dashService.setMode(settedMode);
  }

  openActions(event: Event, i: number) {
    event.stopPropagation();
    this.isEdit = !this.isEdit;
    this.activeRow = i;
  }

  createCommentsArray(client): void {
    if (this.comments.includes(client)) {
      this.comments = [];
    } else {
      this.comments = [];
      this.comments.push(client);
    }
  }

  transformDate(number) {
    number = number.toString();
    if (number.length < 2) {
      return '0' + number;
    }

    return number;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
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
    this.api.client.getAllClients(this.config).subscribe(clients => {
      if (clients) {
        this.clients = clients.list;
        this.dataSource.data = this.clients;
        this.config.totalPage = clients.totalPages;
        this.loading = false;
      }
    });
  }

  private clear() {
    this.dashService.setDeletedItem(null);
    this.modal.setDeleteModalResult(null);
  }

}
