import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ModalService } from 'src/app/_shared/components/modal/modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent implements OnInit {
  public deletedItem = {
    id: '',
    role: '',
    navigate: false
  };

  constructor(private dashService: DashboardService, private modal: ModalService) { }

  ngOnInit() {
    this.dashService.deletedItem$.subscribe(item => this.deletedItem = item);
  }

  public confirm() {
    this.modal.setDeleteModalResult({item: this.deletedItem.role, id: this.deletedItem.id, navigate: this.deletedItem.navigate});
  }

  public close() {
    this.modal.close();
  }

}
