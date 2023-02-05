import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IconName } from '@ng-icons/core';

@Component({
  selector: 'app-icon-button',
  template: ` <button (click)="onButtonClick($event)" [type]="type">
    <ng-icon [name]="icon"></ng-icon>
  </button>`,
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() public icon: IconName = 'bootstrapExclamationOctagonFill';
  @Input() public disabled: boolean = false;
  @Input() public type: string = 'button';
  @Output() public click: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @HostListener('click')
  onClick() {}

  public onButtonClick(event: MouseEvent) {
    this.onClick();
  }
}
