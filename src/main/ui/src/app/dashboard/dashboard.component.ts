import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { ApiService } from '../_shared/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  route: string;
  isShowMsg: boolean;
  confirmMsg: {text: string, color: 'red' | 'green'};
  isShowQuick: boolean;
  isNotification: boolean;
  menuTop = [
    { title: 'Пациенты', icon: '/assets/icons/nav-customers.svg', routerLink: 'clients' },
    { title: 'Сотрудники', icon: '/assets/icons/nav-profile.svg', routerLink: 'users' },
  ];
  menuBottom = [
    { title: 'Выйти', icon: '/assets/icons/nav-logout.svg', routerLink: 'login' }
  ];

  quickMenu = [
    { title: 'Новый пациент', icon: '/assets/icons/nav-customers.svg', path: '/dashboard/clients/add-client' },
    { title: 'Новый сотрудник', icon: '/assets/icons/nav-profile.svg', path: '/dashboard/users/add-user' }
  ]

  @ViewChild('notification') notification: ElementRef;
  @ViewChild('quick') quick: ElementRef;

  private ngUnsubscribe$$ = new Subject()

  constructor(
    private router: Router,
    private api: ApiService,
    private dashService: DashboardService) { }

  ngOnInit() {
    this.api.error.localErrors$$
      .pipe(takeUntil(this.ngUnsubscribe$$))
      .subscribe(e => this.dashService.setConfirmMsg({text: e.message, color: 'red'}))
    this.route = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.route = event.url
    });
    this.dashService.confirmMsg$.pipe(takeUntil(this.ngUnsubscribe$$)).subscribe(msg => {
      this.confirmMsg = msg;
      this.isShowMsg = true;
      setTimeout(() => this.isShowMsg = false, 2000);
      setTimeout(() => this.confirmMsg = null, 2500);
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
