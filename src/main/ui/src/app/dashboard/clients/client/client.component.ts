import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { DashboardService } from '../../dashboard.service';
import { ApiService } from 'src/app/_shared/services/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {
  client;
  loading: boolean = true;

  private clientID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private modal: ModalService,
    private dashService: DashboardService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientID = params.get('id');
      this.getClient();
    });
    this.modal.deleteModalResult$.subscribe(res => {
      if (res && res.item === 'client' && res.navigate) {
        this.loading = true;
        this.api.client.deleteClient(res.id).subscribe(responce => {
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
        this.getClient();
        this.dashService.setConfirmMsg(event.msg);
      }
    });
  }

  openModal(mode: string) {
    if (mode === 'delete') {
      this.modal.open({component: DeleteModalComponent});
      this.client.role = 'client';
      this.client.navigate = true;
      this.dashService.setDeletedItem(this.client);
      return;
    }
    this.router.navigateByUrl(`/dashboard/clients/${this.clientID}/edit-client`)
    const modalMode = {
      type: mode,
      userID: this.client.id,
      item: 'client'
    };
    this.dashService.setMode(modalMode);
  }

  getInitials(): string {
    return `${this.client.lastname[0]}${this.client.firstname[0]}`;
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

  navigate() {
    this.router.navigateByUrl('/dashboard/clients');
  }

  private getClient() {
    this.api.client.getClient(this.clientID).subscribe(client => {
      this.client = client.list[0];
      this.loading = false;
    });
  }

  private clear() {
    this.client = null;
    this.clientID = null;
    this.dashService.setDeletedItem(null);
    this.modal.setDeleteModalResult(null);
  }

}
