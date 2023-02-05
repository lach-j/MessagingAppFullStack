import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-messages',
  template: ` <div *ngIf="messageGroup$ | async as messageGroup; else loading">
      <h1>{{ messageGroup.groupName }}</h1>
      <div *ngFor="let message of messageGroup.messages">
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
  public messageGroup$ = this.messageService.messageGroup$(1);

  constructor(public messageService: MessagingService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.messageService.createMessage(1, { content: 'test' });
    }, 2000);
  }
}
