import { Component, OnInit, ViewChild, ElementRef, ViewChildren, HostListener, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../_shared/services/api.service';
import { ModalService } from '../../_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { HtTypes } from '../../_shared/services/ht.types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit, OnDestroy {
  loading: boolean;
  isSearch: boolean;
  isEdit: boolean;
  activeRow: number = null;
  user = {};
  users;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  displayedColumns = ['fullName', 'position', 'phone', 'login', 'edit'];

  @ViewChild('searchBlock') searchBlock: ElementRef
  @ViewChild('searchInput') private searchInput: ElementRef
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
    this.getEmployees();
    this.subscribeToReloadEvent()
  }

  ngOnDestroy() {
    this.ngUnsubscribe$$.next()
    this.ngUnsubscribe$$.complete()
  }

  onSearch(searchText: string) {
    this.config.search = searchText ? searchText : ''
    this.getEmployees();
  }

  openDeleteModal(item: any) {
    this.modal.open({component: DeleteModalComponent});
    this.dashService.setDeletedItem({name: 'deleteUser', item});
  }

  openActions(event: Event, i: number) {
    event.stopPropagation();
    this.isEdit = this.activeRow === i ? false : true;
    this.activeRow = this.activeRow === i ? null : i;
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


  private getEmployees() {
    this.loading = true;
    this.api.user.getAllUsers(this.config).subscribe(employees => {
      if (employees) {
        this.users = employees.list;
        this.dataSource.data = this.users;
        this.loading = false;
        this.config.totalPage = employees.totalPages;
      }
    });
  }

  private subscribeToReloadEvent() {
    this.dashService.reloadEvent$.pipe(takeUntil(this.ngUnsubscribe$$), filter(e => e && e === 'user')).subscribe(() => {
      this.dashService.setDeletedItem(null);
      this.getEmployees()
    })
  }

}
