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
  @Input('value') _value: any = '';
  @Input() name: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string;
  @Input() required: boolean;
  @Input() error: string;
  @Input() mask: string;
  @Input() dropSpecialCharacters: boolean;
  @Input() autofocus: boolean;
  @Input() search: boolean;
  @Input() isActive: boolean = false;
  @Input() caret: boolean;

  currentType: string;
  passIcon: string;

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

  toggleShowPass() {
    if (this.currentType === 'text') {
      this.currentType = 'password';
      this.passIcon = this.hidePass;
    } else {
      this.currentType = 'text';
      this.passIcon = this.showPass;
    }
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
