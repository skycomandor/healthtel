import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { PageConfig } from '../../_shared/models/common.model';
import { ApiService } from '../../_shared/services/api.service';
import { ModalService } from '../../_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { takeUntil } from 'rxjs/operators';

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

  @ViewChild('searchBlock') searchBlock: ElementRef
  @ViewChild('searchInput') private searchInput: ElementRef
  @ViewChild('clientsTable') table: ElementRef

  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  displayedColumns = ['fullName', 'lastVisit', 'phone', 'doctor', 'discount', 'edit'];
  @ViewChildren('editColumn') private _editColumn: ElementRef[];

  private config: PageConfig = {
    page: 1,
    size: 10,
    totalPage: null,
    search: null
  };

  private ngUnsubscribe$$ = new Subject()

  constructor(
    private router: Router,
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.config.size = Math.floor(this.table.nativeElement.clientHeight / 40 - 1)
    this.getClients();
    this.modal.deleteModalResult$.pipe(takeUntil(this.ngUnsubscribe$$)).subscribe(res => {
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
    this.dashService.crudEvent$.pipe(takeUntil(this.ngUnsubscribe$$)).subscribe(event => {
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

  openModal(mode: string, item?: any) {
    if (mode === 'delete') {
      this.modal.open({component: DeleteModalComponent});
      item.role = 'client';
      this.dashService.setDeletedItem(item);
    }
  }

  openActions(event: Event, i: number) {
    event.stopPropagation();
    this.isEdit = this.activeRow === i ? false : true;
    this.activeRow = this.activeRow === i ? null : i;
  }

  createCommentsArray(client): void {
    if (this.comments.includes(client)) {
      this.comments = [];
    } else {
      this.comments = [];
      this.comments.push(client);
    }
  }

  transformDate(number: any) {
    number = number.toString();
    return number.length < 2 ? '0' + number : number;
  }

  showInput() {
    this.isSearch = !this.isSearch;
    setTimeout(() => this.searchInput.nativeElement.focus())
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const notificationClickedInside: boolean = this.searchBlock.nativeElement.contains(targetElement);
    const clickedInside: boolean = this._editColumn.some(item => item.nativeElement.contains(targetElement));

    if (!notificationClickedInside) this.isSearch = false
    if (!clickedInside) this.isEdit = false
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
