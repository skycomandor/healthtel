import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { ModalService } from '../_shared/components/modal/modal.service';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public route: string;
  public isShowMsg: boolean;
  public confirmMsg: string = '';
  public isShowQuick: boolean;
  public isNotification: boolean;
  public menuTop = [
    { title: 'Пациенты', icon: '/assets/icons/nav-customers.svg', routerLink: 'clients' },
    { title: 'Сотрудники', icon: '/assets/icons/nav-profile.svg', routerLink: 'employees' },
  ];
  public menuBottom = [
    { title: 'Выйти', icon: '/assets/icons/nav-logout.svg', routerLink: 'login' }
  ];

  @ViewChild('notification')
  public notification: ElementRef;
  @ViewChild('quick')
  public quick: ElementRef;

  constructor(
    private router: Router,
    private dashServ: DashboardService,
    private modal: ModalService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.route = this.router.url;
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.route = event.url;
    });
    this.dashServ.confirmMsg$.subscribe(msg => {
      this.confirmMsg = msg;
      this.isShowMsg = true;
      setTimeout(() => this.isShowMsg = false, 2000);
      setTimeout(() => this.confirmMsg = '', 2500);
    });
  }

  public openModal(mode: string) {
    if (mode === 'client') {
      this.modal.open({component: CreateClientComponent});
      this.dashService.setMode({type: 'add', item: 'client'});
    } else {
      this.modal.open({component: CreateEmployeeComponent});
      this.dashService.setMode({type: 'add', item: 'employee'});
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const notificationClickedInside: boolean = this.notification.nativeElement.contains(targetElement);
    const quickClickedInside: boolean = this.quick.nativeElement.contains(targetElement);

    if (!notificationClickedInside) {
      this.isNotification = false;
    }

    if (!quickClickedInside) {
      this.isShowQuick = false;
    }
  }

}
