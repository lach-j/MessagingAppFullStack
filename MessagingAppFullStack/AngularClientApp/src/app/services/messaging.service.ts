import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, filter, first, map, of, zip } from 'rxjs';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private readonly messageGroups: {
    [groupId: number]: BehaviorSubject<MessageGroup | undefined>;
  } = {};

  private readonly _messageGroups$ = new BehaviorSubject<MessageGroup[]>([]);

  constructor(private apiService: ApiService) {
    this.apiService
      .get<{ id: number; title: number; users: any }>('/Messaging')
      .subscribe((groups) => {
        console.log(groups.data);
      });
  }

  public messageGroup$(groupId: number) {
    this.loadInitialMessages(groupId);
    return this.getOrCreateMessages(groupId);
  }

  public get messageGroups$() {
    this.apiService
      .get<MessageGroup[]>('/messaging')
      .pipe(
        filter((res) => !!res.data),
        map((res) => res.data as MessageGroup[])
      )
      .subscribe((groups) => {
        this._messageGroups$.next(groups);
      });
    return this._messageGroups$;
  }

  public createMessage(messageGroupId: number, message: string) {
    this.apiService
      .post<Message>(`/messaging/${messageGroupId}`, of({ content: message }))
      .pipe(
        filter((res) => !!res.data && !res.error),
        map((res) => res.data as Message)
      )
      .subscribe((newMessage) => {
        this.getOrCreateMessages(messageGroupId)
          .pipe(first())
          .subscribe((group) => {
            if (group)
              this.getOrCreateMessages(messageGroupId).next({
                ...group,
                messages: [...group.messages, newMessage],
              });
          });
      });
  }

  private getOrCreateMessages(groupId: number) {
    if (!this.messageGroups?.[groupId])
      this.messageGroups[groupId] = new BehaviorSubject<
        MessageGroup | undefined
      >(undefined);

    return this.messageGroups[groupId];
  }

  private loadInitialMessages(groupId: number) {
    const messageGroup$ = this.apiService
      .get<MessageGroup>(`/Messaging/${groupId}`)
      .pipe(
        filter((messages) => !!messages.data && !messages.error),
        map((x) => x.data as MessageGroup)
      );
    const messages$ = this.apiService
      .get<Message[]>(`/messaging/${groupId}/messages`)
      .pipe(
        filter((messages) => !!messages.data && !messages.error),
        map((x) => x.data as Message[])
      );

    zip([messageGroup$, messages$]).subscribe(([messageGroup, messages]) =>
      this.getOrCreateMessages(groupId).next({ ...messageGroup, messages })
    );
  }
}

export interface Message {
  id?: number;
  content: string;
  timestamp?: string;
  user: User;
}

export interface MessageGroup {
  id?: number;
  activeUsers: User[];
  messages: Message[];
  groupName: string;
}
