import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../services/messaging.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  template: ` <div *ngIf="messageGroups$ | async as groups">
      <span *ngFor="let group of groups">{{
        group.groupName.toUpperCase()
      }}</span>
    </div>
    <div *ngIf="messageGroup$ | async as messageGroup; else loading">
      <h1>{{ messageGroup.groupName }}</h1>
      <app-message
        [currentUser]="userService.user$ | async"
        *ngFor="let message of messageGroup.messages"
        [message]="message"
      >
      </app-message>
      <app-send-bar
        class="send-button"
        (onSend)="addMessage($event)"
      ></app-send-bar>
    </div>
    <ng-template #loading>
      <span>Loading...</span>
    </ng-template>`,
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public messageGroup$ = this.messageService.messageGroup$(1);
  public messageGroups$ = this.messageService.messageGroups$;

  constructor(
    public messageService: MessagingService,
    public userService: UserService
  ) {}

  public addMessage(message: string) {
    this.messageService.createMessage(1, message);
  }

  ngOnInit(): void {}
}
