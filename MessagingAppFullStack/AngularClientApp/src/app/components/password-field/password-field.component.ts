import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'password-field',
  template: `<div class="wrapper">
    <input
      [(ngModel)]="value"
      [type]="getInputType()"
      [placeholder]="placeholder"
    />
    <app-icon-button
      class="toggle-show-button"
      [icon]="showPassword ? 'bootstrapEyeSlash' : 'bootstrapEye'"
      (click)="toggleShowPassword()"
    ></app-icon-button>
  </div>`,
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true,
    },
  ],
})
export class PasswordFieldComponent implements ControlValueAccessor {
  @Input() public placeholder?: string = '';
  val = '';
  showPassword = false;

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

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
