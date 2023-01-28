import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-messages',
  template: `<div *ngIf="messages$ | async as messages; else loading">
      <div *ngFor="let message of messages">
        {{ message.id }} - {{ message.content }} :
        {{ message.timestamp | date }}
      </div>
    </div>
    <ng-template #loading>
      <span>Loading...</span>
    </ng-template>`,
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessagingService) {}

  public messages$ = this.messageService.messages$;

  ngOnInit(): void {
    setTimeout(() => {
      this.messageService.createMessage({ content: 'test' });
    }, 2000);
  }
}
