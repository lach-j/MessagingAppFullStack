import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CustomTheme } from '../../../themes';

@Component({
  selector: 'app-button',
  template: `
    <button
      (click)="onButtonClick($event)"
      [class]="themeName"
      [type]="type"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public isPrimary: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public type: string = 'button';
  @Output() public click: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @Input() public theme: CustomTheme = 'primary';

  public get themeName() {
    return `theme-${this.theme}`;
  }

  @HostListener('click')
  onClick(event: MouseEvent) {}

  public onButtonClick(event: MouseEvent) {
    this.onClick(event);
  }
}
