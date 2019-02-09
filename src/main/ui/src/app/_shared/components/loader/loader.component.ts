import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
  <div class="loader">
    <mat-spinner diameter="80" strokeWidth="2"></mat-spinner>
  </div>`,
  styles: [
    `
      .loader {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.8);
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    `
  ]
})
export class LoaderComponent implements OnInit {
  constructor() {}

  public ngOnInit() {}
}
