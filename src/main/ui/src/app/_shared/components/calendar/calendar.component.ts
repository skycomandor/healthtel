import { Component, EventEmitter, Input, OnInit, Output, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  public mode: string = '';
  public errorMessage: string;
  public openCalendar: boolean;
  public currentDate = moment();
  public yearsMinMax = {
    max: this.currentDate.year() + 5,
    min: 0,
  };
  public years: number[];
  public dayNames: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public months: any[] = [
    { text: 'january', number: '01' },
    { text: 'february', number: '02' },
    { text: 'march', number: '03' },
    { text: 'april', number: '04' },
    { text: 'may', number: '05' },
    { text: 'june', number: '06' },
    { text: 'july', number: '07' },
    { text: 'august', number: '08' },
    { text: 'september', number: '09' },
    { text: 'october', number: '10' },
    { text: 'november', number: '11' },
    { text: 'december', number: '12' }
  ];
  public weeks: ICalendarDate[][] = [];
  public selectedDate: ISelectedDate = {
    mDate: {},
    fullDate: '',
    viewDate: ''
  };
  public date: FormControl = new FormControl('');

  @Input()
  public isTodayClass: boolean;
  @Input()
  public name: string;
  @Input()
  public value: string = '';
  @Input()
  public label: string;
  @Input()
  public error: string;
  @Input()
  public required: boolean;
  @Output()
  public dateSelect: EventEmitter<any> = new EventEmitter<any>();

  private _isFirstWeek: boolean = true;
  private _choosenDate: string;
  private _isNotFirstClick: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.value) {
      this.selectedDate.viewDate = this.value;
      this.date.setValue(this.value);
    }
    this.setDate();
  }

  public onOpenCalendar() {
    this.errorMessage = '';
    if ( this.date.value.length < 8 && this.date.value.length > 0) {
      this.date.setValue(this.selectedDate.viewDate);
      this.errorMessage = 'введите дату правильно';
      return;
    }
    this.openCalendar = !this.openCalendar;
  }

  public onInputDate(e: any) {
    this.openCalendar = false;
    if (!e) {
      return;
    }
    if (e.target.value.length === 10) {
      this.selectedDate.viewDate = e.target.value;
      this.setDate();
      this.dateSelect.emit(this.selectedDate.viewDate);
    }
  }

  public setDate() {
    this.yearsMinMax.min = this.yearsMinMax.max - 11;
    this._createYearsArr();
    if (this.selectedDate.viewDate) {
      this.selectedDate.mDate.mDate = moment(this.selectedDate.viewDate, 'DD.MM.YYYY');
      const date: string[] = this.selectedDate.viewDate.split('.').splice(1, 3);
      let isoDate: any = [];
      isoDate.push(date[1], date[0]);
      isoDate = isoDate.join('-');
      this.currentDate = moment(isoDate);
      this._isFirstWeek = true;
    }
    this._generateCalendar();
  }

  public prevYears() {
    this.yearsMinMax.max = this.yearsMinMax.min - 1;
    this.yearsMinMax.min = this.yearsMinMax.max - 11;
    this._createYearsArr();
  }
  public nextYears() {
    this.yearsMinMax.min = this.yearsMinMax.max + 1;
    this.yearsMinMax.max = this.yearsMinMax.min + 11;
    this._createYearsArr();
  }

  public setCurrent(value: any) {
    if (this.mode === 'year') {
      this._choosenDate = value.toString();
      this.mode = 'month';
      return;
    }
    if (this.mode === 'month') {
      this._choosenDate += '-' + value.number;
      this.currentDate = moment(this._choosenDate);
      this.mode = '';
      this._isFirstWeek = true;
      this._generateCalendar();
    }
  }

  public selectDate(date: any, i): void {
    const dateObj: ISelectedDate = {
      mDate: date,
      fullDate: date.mDate._d,
      viewDate: date.mDate.format('DD.MM.YYYY')
    };
    this.openCalendar = false;
    this.selectedDate = dateObj;
    this.dateSelect.emit(dateObj.viewDate);
    this.date.setValue(dateObj.viewDate);
    this.setDate();
  }

  // actions from calendar

  public prevMonth(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this._generateCalendar();
  }

  public nextMonth(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this._generateCalendar();
  }

  public prevYear(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this._generateCalendar();
  }

  public nextYear(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this._generateCalendar();
  }

  // date checkers

  public isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  private _isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private _isSelected(date: moment.Moment): boolean {
    if (this.selectedDate.viewDate) {
      return moment(date).isSame(this.selectedDate.mDate.mDate, 'day');
    }
    return false;
  }

  // generate the calendar grid

  private _generateCalendar(): void {
    const dates: ICalendarDate[] = this._fillDates(this.currentDate);
    const weeks: ICalendarDate[][] = [];
    while (dates.length > 0) {
      const week = dates.splice(0, 7);
      if (this.isSelectedMonth(week[0].mDate) || this._isFirstWeek) {
        this._isFirstWeek = false;
        weeks.push(week);
      }
    }
    this.weeks = weeks;
  }

  private _fillDates(currentMoment: moment.Moment): ICalendarDate[] {
    const firstOfMonth: number = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid: moment.Moment = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start: number = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): ICalendarDate => {
              const d: moment.Moment = moment(firstDayOfGrid).date(date);
              return {
                today: this._isToday(d),
                selected: this._isSelected(d),
                mDate: d,
              };
            });
  }

  private _createYearsArr() {
    this.years = _.range(this.yearsMinMax.min, this.yearsMinMax.max + 1);
  }
}

interface ICalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

interface ISelectedDate {
  mDate: any;
  fullDate?: string;
  viewDate?: string;
}
