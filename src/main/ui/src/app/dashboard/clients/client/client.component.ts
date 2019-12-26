import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { DashboardService } from '../../dashboard.service';
import { ApiService } from 'src/app/_shared/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit, OnDestroy {
  client;
  loading: boolean = true;

  private clientID: string;
  private ngUnsubscribe$$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService) { }

  ngOnInit() {
    this.clientID = this.route.snapshot.params.clientID
    this.getClient();
    this.subscribeToReloadEvent()
  }

  ngOnDestroy() {
    this.ngUnsubscribe$$.next()
    this.ngUnsubscribe$$.complete()
  }

  openDeleteModal() {
    this.modal.open({component: DeleteModalComponent});
    this.dashService.setDeletedItem({name: 'deleteClient', item: this.client});
  }

  getAge() {
    const today = new Date();
    const d = today.getDate();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();
    let clientAge = y - this.client.birthyear;
    if (m < this.client.birthMonth || (m < this.client.birthMonth && d < this.client.birthDay)) {
      clientAge = clientAge - 1;
    }
    return clientAge;
  }

  private getClient() {
    this.api.client.getClient(this.clientID).subscribe(client => {
      this.client = client.list[0];
      this.loading = false;
    });
  }

  private subscribeToReloadEvent() {
    this.dashService.reloadEvent$.pipe(takeUntil(this.ngUnsubscribe$$), filter(e => e && e === 'client')).subscribe(() => {
      this.dashService.setDeletedItem(null);
      this.getClient()
    })
  }
}
