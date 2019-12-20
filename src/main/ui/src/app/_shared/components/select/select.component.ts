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
  @Input('value')_value: Option = { title: '', value: '' };
  @Input() name: string;
  @Input() label: string;
  @Input() options: Option[];
  @Input() required: boolean;
  @Input() placeholder: string = '';
  @Input() error: string = '';
  @Input() caret: boolean;

  isSelectOpen: boolean = false;
  private _isNotFirstClick: boolean = false;


  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    setTimeout(() => {
      this.onChange(val.value);
      this.onTouched();
    })
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  onSelect (e, option) {
    this.isSelectOpen = false;
    this.value = option;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const clickedInside: boolean = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this._isNotFirstClick) this.isSelectOpen = false
    this._isNotFirstClick = true;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
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

