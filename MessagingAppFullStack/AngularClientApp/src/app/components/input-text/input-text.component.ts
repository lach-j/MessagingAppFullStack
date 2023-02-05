import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  template: `<div>
    <input [(ngModel)]="value" [placeholder]="placeholder" />
  </div>`,
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent {
  @Input() public placeholder?: string = '';
  val = '';

  constructor() {}

  set value(val: string) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(value: any) {
    if (!value) return;

    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
