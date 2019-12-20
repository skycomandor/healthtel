import { Component, OnInit, forwardRef, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @ViewChild('datePicker') datePicker: ElementRef;
  @Input() placeholder: string = 'dd.mm.yyyy'
  @Input() isTodayClass: boolean
  @Input() name: string
  @Input() label: string
  @Input() required: boolean
  @Input() error: string

  _value: {date: string, view: string} = {
    date: null,
    view: null
  };
  accurateDate: string;
  isCalendarOpen: boolean;
  selectedDate: any;
  mode: string = '';
  currentDate = moment();
  yearsMinMax = {
    max: this.currentDate.year() + 5,
    min: 0,
  };
  years: number[];
  dayNames: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  months: any[] = [
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
  weeks: ICalendarDate[][] = [];

  private _isFirstWeek: boolean = true;
  private choosenDate: string;

  constructor() {}

  get value() {
    return this._value;
  }

  set value(val: any) {
    if (val && !val.hasOwnProperty('date') && (typeof val === 'string' || typeof val === 'object')) {
      val = {
        date: val,
        view: moment(val).format('DD.MM.YYYY')
      }
    }
    if (val && (!this.selectedDate || !this.selectedDate.mDate.isSame(moment(val.date)))) {
      this.selectedDate = {
        today: this.isToday(moment(val.date)),
        selected: this.isSelected(moment(val.date)),
        mDate: moment(val.date).utc(true)
      }
    } else if (!val) { this.selectedDate = null }
    this._value = val;
    if (val) this.onChange(moment(val.date).utc(true))
    this.onTouched();
  }

  ngOnInit(): void {
    this.yearsMinMax.min = this.yearsMinMax.max - 11;
    this.createYearsArr();
  }

  openCalendar(): void {
    this._isFirstWeek = true
    this.isCalendarOpen = !this.isCalendarOpen
    if (this.selectedDate) this.currentDate = this.selectedDate.mDate;
    this.generateCalendar();
  }

  inputDate(date: string): void {
    if (date.length) {
      if (+date[0] > 3) {
        const arr: string[] = date.split('')
        arr.unshift('0')
        this.accurateDate = arr.join()
      }
      if (+date[3] > 1) {
        const arr = date.split('')
        arr.splice(2, 0, '0')
        this.accurateDate = arr.join()
      }
    }
    if (date.length === 10 && moment(date, 'DD.MM.YYYY').isValid()) {
      this.error = ''
      this.value = { date: moment(date, 'DD.MM.YYYY').toDate(), view: date }
    } else {
      this.error = 'dd.mm.yyyy'
      this.value = null
    }
  }

  prevYears() {
    this.yearsMinMax.max = this.yearsMinMax.min - 1;
    this.yearsMinMax.min = this.yearsMinMax.max - 11;
    this.createYearsArr();
  }
  nextYears() {
    this.yearsMinMax.min = this.yearsMinMax.max + 1;
    this.yearsMinMax.max = this.yearsMinMax.min + 11;
    this.createYearsArr();
  }

  setCurrent(value: any) {
    if (this.mode === 'year') {
      this.choosenDate = value.toString();
      this.mode = 'month';
      return;
    }
    if (this.mode === 'month') {
      this.choosenDate += '-' + value.number;
      this.currentDate = moment(this.choosenDate);
      this.mode = '';
      this._isFirstWeek = true;
      this.generateCalendar();
    }
  }

  selectDate(date: any): void {
    this.isCalendarOpen = false;
    this.selectedDate = date
    this.value = { date: date.mDate.toDate(), view: date.mDate.format('DD.MM.YYYY') }
  }

  // actions from calendar

  prevMonth(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  prevYear(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this._isFirstWeek = true;
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // date checkers

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected(date: moment.Moment): boolean {
    if (this.selectedDate) {
      return moment(date).isSame(this.selectedDate.mDate, 'day');
    }
    return false;
  }

  // generate the calendar grid

  private generateCalendar(): void {
    const dates: ICalendarDate[] = this.fillDates(this.currentDate);
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

  private fillDates(currentMoment: moment.Moment): ICalendarDate[] {
    const firstOfMonth: number = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid: moment.Moment = moment(currentMoment).startOf('month').subtract(firstOfMonth > 0 ? firstOfMonth - 1 : 6, 'days');
    const start: number = firstDayOfGrid.date();
    return this.range(start, start + 42)
            .map((date: number): ICalendarDate => {
              const d: moment.Moment = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
              };
            });
  }

  private range(start: number, stop: number, step = 1): number[] {
    return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
  }

  private createYearsArr() {
    this.years = this.range(this.yearsMinMax.min, this.yearsMinMax.max + 1);
  }

  @HostListener('document:click', ['$event.target'])
  onclick(targetEl) {
    let clickedInside: boolean
    if (this.datePicker) clickedInside = this.datePicker.nativeElement.contains(targetEl);
    if (!clickedInside) this.isCalendarOpen = false
  }

  writeValue(value) {
    this.value = value;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  private onChange: any = () => {};
  private onTouched: any = () => {};
}

interface ICalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

