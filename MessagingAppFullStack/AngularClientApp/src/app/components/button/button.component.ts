import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [class.primary]="isPrimary"
      (click)="onButtonClick($event)"
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

  @HostListener('click')
  onClick(event: MouseEvent) {}

  public onButtonClick(event: MouseEvent) {
    this.onClick(event);
  }
}
