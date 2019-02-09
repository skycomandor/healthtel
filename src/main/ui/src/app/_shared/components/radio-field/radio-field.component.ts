import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.sass']
})
export class RadioFieldComponent implements OnInit {
  public checkedItem: number;
  @Input() options: [{label: any, value: any}];
  @Input() label: string;
  @Input() fieldName: string;
  @Input() radioForm: FormGroup;
  @Input() checked: boolean;
  @Input() required: boolean;

  constructor() { }

  ngOnInit() {
    if (this.radioForm) {
      if (this.checked && !this.radioForm.value[this.fieldName]) {
        this.checkedItem = 0;
        this.radioForm.get(this.fieldName).setValue(this.options[0].value);
      }
      if (this.radioForm.value[this.fieldName]) {
        this.checkedItem = this.returnIndexByKeyValue(this.radioForm.value[this.fieldName], this.options);
      }
    }
  }

  private returnIndexByKeyValue(value: any, array: [{label: any, value: any}]): number {
    const index = array.findIndex(item => item.value === value);
    return index;
  }

}

