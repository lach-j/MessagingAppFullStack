import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-bar',
  template: `
    <form #f="ngForm" (ngSubmit)="onSendClicked(f)">
      <div class="wrapper">
        <app-input-text
          class="input-field"
          ngModel
          name="messageText"
        ></app-input-text>
        <app-icon-button
          theme="primary"
          icon="bootstrapSend"
          type="submit"
        ></app-icon-button>
      </div>
    </form>
  `,
  styleUrls: ['./send-bar.component.scss'],
})
export class SendBarComponent {
  public text: string = '';

  @Output() public onSend: EventEmitter<string> = new EventEmitter<string>();

  onSendClicked(form: NgForm) {
    const { messageText } = form.value;

    if (messageText) {
      this.onSend.emit(messageText);
      form.setValue({ messageText: '' });
    }
  }
}
