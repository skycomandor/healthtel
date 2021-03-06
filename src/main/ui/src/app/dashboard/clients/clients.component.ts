import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../_shared/services/api.service';
import { ModalService } from '../../_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { HtTypes } from '../../_shared/services/ht.types';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit, OnDestroy {
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

  private config: HtTypes.common.pageConfig = {
    page: 1,
    size: 10,
    totalPage: null,
    search: null
  };

  private ngUnsubscribe$$ = new Subject()

  constructor(
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.config.size = Math.floor(this.table.nativeElement.clientHeight / 40 - 1)
    this.getClients();
    this.subscribeToReloadEvent()
  }

  ngOnDestroy() {
    this.ngUnsubscribe$$.next()
    this.ngUnsubscribe$$.complete()
  }

  onSearch(searchText: string) {
    this.config.search = searchText ? searchText : ''
    this.getClients();
  }

  onPageChange(page: number) {
    this.config.page = page;
    this.getClients();
  }

  openDeleteModal(item: any) {
    this.modal.open({component: DeleteModalComponent});
    this.dashService.setDeletedItem({name: 'deleteClient', item});
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
      this.clients = clients.list;
      this.dataSource.data = this.clients;
      this.config.totalPage = clients.totalPages;
      this.loading = false;
    });
  }

  private subscribeToReloadEvent() {
    this.dashService.reloadEvent$.pipe(takeUntil(this.ngUnsubscribe$$), filter(e => e && e === 'client')).subscribe(() => {
      this.dashService.setDeletedItem(null);
      this.getClients()
    })
  }

}
