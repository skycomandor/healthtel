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
  route: string;
  isShowMsg: boolean;
  confirmMsg: string = '';
  isShowQuick: boolean;
  isNotification: boolean;
  menuTop = [
    { title: 'Пациенты', icon: '/assets/icons/nav-customers.svg', routerLink: 'clients' },
    { title: 'Сотрудники', icon: '/assets/icons/nav-profile.svg', routerLink: 'employees' },
  ];
  menuBottom = [
    { title: 'Выйти', icon: '/assets/icons/nav-logout.svg', routerLink: 'login' }
  ];

  quickMenu = [
    { title: 'Новый пациент', icon: '/assets/icons/nav-customers.svg', path: '/dashboard/clients/add-client' },
    { title: 'Новый сотрудник', icon: '/assets/icons/nav-profile.svg', path: '/dashboard/clients/add-employee' }
  ]

  @ViewChild('notification') notification: ElementRef;
  @ViewChild('quick') quick: ElementRef;

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


  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const notificationClickedInside: boolean = this.notification.nativeElement.contains(targetElement);
    const quickClickedInside: boolean = this.quick.nativeElement.contains(targetElement);
    if (!notificationClickedInside) this.isNotification = false
    if (!quickClickedInside) this.isShowQuick = false
  }

}
