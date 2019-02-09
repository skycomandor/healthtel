import { Component, OnInit, Input, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input()
  public name: string = 'name';
  @Input()
  public type: string = 'text';
  @Input()
  public placeholder: string = '';
  @Input()
  public label: string;
  @Input()
  public required: boolean;
  @Input()
  public error: string;
  @Input()
  public mask: string;
  @Input()
  public dropSpecialCharacters: boolean;
  @Input()
  public autofocus: boolean;
  @Input()
  public search: boolean;
  @Input()
  public isActive: boolean = false;
  @Input()
  public caret: boolean;
  @Input('value')
  public _value: any = '';

  public currentType: string;
  public passIcon: string;

  private showPass = '/assets/icons/show.svg';
  private hidePass = '/assets/icons/hide.svg';

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() { }

  ngOnInit() {
    this.currentType = this.type;
    this.passIcon = this.hidePass;
  }

  ngAfterViewInit() {
    if (this.autofocus) {
      document.getElementById(this.name).focus();
    }
  }

  public toggleShowPass() {
    if (this.currentType === 'text') {
      this.currentType = 'password';
      this.passIcon = this.hidePass;
    } else {
      this.currentType = 'text';
      this.passIcon = this.showPass;
    }
  }

  public writeValue(value) {
    this.value = value;
  }
  public registerOnChange(fn) {
    this.onChange = fn;
  }
  public registerOnTouched(fn) {
    this.onTouched = fn;
  }
  private onChange: any = () => {};
  private onTouched: any = () => {};
}
