import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IconName } from '@ng-icons/core';
import { CustomSize, CustomTheme } from '../../../themes';

@Component({
  selector: 'app-icon-button',
  template: ` <button
    [class]="themeName + ' ' + buttonSize"
    (click)="onButtonClick($event)"
    [type]="type"
  >
    <ng-icon [name]="icon"></ng-icon>
  </button>`,
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() public icon: IconName = 'bootstrapExclamationOctagonFill';
  @Input() public disabled: boolean = false;
  @Input() public type: string = 'button';
  @Input() public theme: CustomTheme = 'ghost';
  @Input() public size: CustomSize = 'xl';
  @Output() public click: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @HostListener('click')
  onClick() {}

  public get themeName() {
    return `theme-${this.theme}`;
  }

  public get buttonSize() {
    return `size-${this.size}`;
  }

  public onButtonClick(event: MouseEvent) {
    this.onClick();
  }
}
