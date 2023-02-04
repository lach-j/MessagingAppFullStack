import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'password-field',
  template: ` <nb-form-field>
    <input
      fullWidth
      [(ngModel)]="value"
      [type]="getInputType()"
      [placeholder]="placeholder"
      nbInput
    />
    <button
      type="button"
      nbSuffix
      nbButton
      ghost
      (click)="toggleShowPassword()"
    >
      <nb-icon
        [icon]="showPassword ? 'eye-off-outline' : 'eye-outline'"
        pack="eva"
        [attr.aria-label]="showPassword ? 'hide password' : 'show password'"
      >
      </nb-icon>
    </button>
  </nb-form-field>`,
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
