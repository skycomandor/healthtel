import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import '../../animation';

// @HostBinding('@routeAnimation') routeAnimation = true;
// @HostBinding('style.display')   display = 'block';
// @HostBinding('style.position')  position = 'absolute';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sub(): void {
    this.router.navigate(['/main/start']);
  }

}
