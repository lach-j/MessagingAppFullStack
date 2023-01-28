import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, first, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private apiService: ApiService) {
    this.apiService
      .get<Message[]>('/api/messaging')
      .pipe(
        first((messages) => !!messages.data),
        map((x) => x.data as Message[])
      )
      .subscribe((messages) => this.messages$.next(messages));
  }

  public readonly messages$: BehaviorSubject<Message[]> = new BehaviorSubject<
    Message[]
  >([]);

  public createMessage(message: Message) {
    this.apiService
      .post<Message>('/api/Messaging', of(message))
      .pipe(
        first((res) => !!res.data),
        map((res) => res.data as Message)
      )
      .subscribe((newMessage) => {
        this.messages$.pipe(first()).subscribe((messages) => {
          this.messages$.next([...messages, newMessage]);
        });
      });
  }
}

export interface Message {
  id?: number;
  content: string;
  timestamp?: string;
}
