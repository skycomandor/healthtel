import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
  <div class="loader">
    <mat-spinner diameter="20" strokeWidth="2"></mat-spinner>
  </div>`,
  styles: [
    `
      .loader {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        right: -50px;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 101;
      }
    `
  ]
})
export class LoaderComponent implements OnInit {
  constructor() {}

  public ngOnInit() {}
}
