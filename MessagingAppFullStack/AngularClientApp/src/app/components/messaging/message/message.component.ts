import { Component, Input } from '@angular/core';
import { Message } from '../../../services/messaging.service';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="message" class="wrapper" [class.own-message]="isOwnMessage()">
      <div class="bubble">
        <div class="content">
          {{ message.content }}
        </div>
        <span class="timestamp">
          {{ message.timestamp | date }}
        </span>
      </div>
    </div>
  `,
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message?: Message;
  @Input() currentUser: User | null = null;

  public isOwnMessage(): boolean {
    return !!this.currentUser && this.currentUser.id === this.message?.user?.id;
  }
}
