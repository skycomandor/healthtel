import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  location = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((data: any) => {
      this.location = data.url;
    });
  }


  returnToLogin(): void {
    this.router.navigate(['']);
  }
}
