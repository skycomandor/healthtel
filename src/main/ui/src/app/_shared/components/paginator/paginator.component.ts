import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {
  public activePage: number = 1;

  @Input()
  public currentPage: number = 1;
  @Input()
  public totalPage: number = 1;
  @Output()
  public pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.generateSmallArr();
  }

  public onPageChange(page: number) {
    if (page > +this.totalPage) {
      return;
    }
    if (page) {
      page = +page;
      this.activePage = page;
      this.pageChange.emit(this.activePage);
    }
  }

  public updatePage(mode: string) {
    if (mode === 'minus' && this.activePage > 1) {
      this.onPageChange(this.activePage - 1);
    }
    if (mode === 'plus' && this.activePage < this.totalPage) {
      this.onPageChange(this.activePage + 1);
    }
  }

  public generateSmallArr() {
    return this.range(1, +this.totalPage);
  }

  public generateStartArr() {
    return this.range(this.activePage, this.activePage + 2);
  }

  public generateEndArr() {
    if (this.activePage > this.totalPage - 6) {
      return this.range(this.totalPage - 5, +this.totalPage);
    }
    return this.range(this.totalPage - 1, +this.totalPage);
  }

  public range(start, end, step = 1) {
    const allNumbers = [start, end, step].every(Number.isFinite);

    if (!allNumbers) {
      throw new TypeError('range() expects only finite numbers as arguments.');
    }
    if (step <= 0) {
      throw new Error('step must be a number greater than 0.');
    }
    if (start > end) {
      step = -step;
    }
    const length = Math.floor(Math.abs((end - start) / step)) + 1;

    return Array.from(Array(length), (x, index) => start + index * step);
  }
}
