import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public route: string;
  public isShowMsg: boolean;
  public confirmMsg: string = '';
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

  constructor(private router: Router, private dashServ: DashboardService) { }

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
  public onClick(targetElement) {
    const notificationClickedInside: boolean = this.notification.nativeElement.contains(targetElement);

    if (!notificationClickedInside) {
      this.isNotification = false;
    }
  }

}
