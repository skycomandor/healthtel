import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ModalService } from '../../_shared/components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent implements OnInit, OnDestroy {
  activeItem: {text: string, action: () => {}, item: any}
  private ngUnsubscribe = new Subject()
  private modalData = {
    deleteClient: {
      text: 'клиента',
      action: () => this.deleteClient()
    },
    deleteUser: {
      text: 'пользователя',
      action: () => this.deleteUser()
    },
  }

  constructor(
    private router: Router,
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService) { }

  ngOnInit() {
    this.dashService.deletedItem$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(e => {
      this.activeItem = {...this.modalData[e.name], item: e.item}
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  confirm() {
    this.activeItem.action()
  }

  close(text?: string) {
    this.modal.close();
    if (text) this.dashService.setConfirmMsg({text, color: 'green'});
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.confirm()
  }

  private deleteClient() {
    this.api.client.deleteClient(this.activeItem.item.id).subscribe(() => {
      this.close('Пациент удалён!');
      this.dashService.setReloadEvent('client')
      this.router.navigateByUrl('/dashboard/clients')
    });
  }

  private deleteUser() {
    this.api.user.deleteUser(this.activeItem.item.id).subscribe(() => {
      this.close('Пользователь удалён!');
      this.dashService.setReloadEvent('user')
      this.router.navigateByUrl('/dashboard/users')
    });
  }

}
