import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, first, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private apiService: ApiService) {}

  public readonly messageGroups: {
    [groupId: number]: BehaviorSubject<Message[]>;
  } = {};

  public messages$(groupId: number) {
    this.loadInitialMessages(groupId);
    return this.getOrCreateMessages(groupId);
  }

  private getOrCreateMessages(groupId: number) {
    if (!this.messageGroups?.[groupId])
      this.messageGroups[groupId] = new BehaviorSubject<Message[]>([]);

    return this.messageGroups[groupId];
  }

  private loadInitialMessages(groupId: number) {
    this.apiService
      .get<Message[]>(`/messaging/${groupId}`)
      .pipe(
        first((messages) => !!messages.data),
        map((x) => x.data as Message[])
      )
      .subscribe((messages) =>
        this.getOrCreateMessages(groupId).next(messages)
      );
  }

  public createMessage(messageGroupId: number, message: Message) {
    this.apiService
      .post<Message>(`/messaging/${messageGroupId}`, of(message))
      .pipe(
        first((res) => !!res.data),
        map((res) => res.data as Message)
      )
      .subscribe((newMessage) => {
        this.getOrCreateMessages(messageGroupId)
          .pipe(first())
          .subscribe((messages) => {
            this.getOrCreateMessages(messageGroupId).next([
              ...messages,
              newMessage,
            ]);
          });
      });
  }
}

export interface Message {
  id?: number;
  content: string;
  timestamp?: string;
}
