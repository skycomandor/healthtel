import { Component, EventEmitter, forwardRef, Input, OnInit, Output, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '../../models/common.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit {
  @Input('value')
  public _value: Option = {
    title: '',
    value: ''
  };
  @Input()
  public name: string;
  @Input()
  public label: string;
  @Input()
  public options: Option[];
  @Input()
  public required: boolean;
  @Input()
  public placeholder: string = '';
  @Input()
  public error: string = '';
  @Input()
  public caret: boolean;

  public isSelectOpen: boolean = false;
  private _isNotFirstClick: boolean = false;


  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val.value);
    this.onTouched();
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  onSelect (e, option) {
    this.isSelectOpen = false;
    this.value = option;
  }

  public capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside: boolean = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this._isNotFirstClick) {
      this.isSelectOpen = false;
    }
    this._isNotFirstClick = true;
  }

  public writeValue(value: any) {
    if (value) {
      this.value = value;
    }
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

