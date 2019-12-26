import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { ApiService } from '../../../_shared/services/api.service';
import { ModalService } from '../../../_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {
  user;
  loading: boolean = true;

  private userID: string;
  private ngUnsubscribe$$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService) { }

  ngOnInit() {
    this.userID = this.route.snapshot.params.userID
    this.initUser();
    this.subscribeToReloadEvent()
  }

  ngOnDestroy() {
    this.ngUnsubscribe$$.next()
    this.ngUnsubscribe$$.complete()
  }

  openDeleteModal() {
    this.modal.open({component: DeleteModalComponent});
    this.dashService.setDeletedItem({name: 'deleteUser', item: this.user})
  }

  private initUser() {
    this.api.user.getUserById(this.userID).subscribe(user => {
      console.log(user)
      this.user = user.list[0];
      this.loading = false;
    });
  }

  private subscribeToReloadEvent() {
    this.dashService.reloadEvent$.pipe(takeUntil(this.ngUnsubscribe$$), filter(e => e && e === 'user')).subscribe(() => {
      this.dashService.setDeletedItem(null);
      this.initUser()
    })
  }

}
