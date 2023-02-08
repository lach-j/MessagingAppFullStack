import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public unsubscribe: Subject<void> = new Subject<void>();

  private readonly _ITEM_KEY = 'MFS-User';

  constructor() {
    this.loadUserData();
  }

  public user$: Subject<User | null> = new ReplaySubject();

  public storeUserData(user: User) {
    window.localStorage.setItem(this._ITEM_KEY, JSON.stringify(user));
    this.user$.next(user);
  }

  public loadUserData() {
    const userJSON = window.localStorage.getItem(this._ITEM_KEY);

    if (userJSON) {
      const user = JSON.parse(userJSON);
      if (isUser(user)) this.storeUserData(user);
    }
  }

  public clearUserData() {
    window.localStorage.removeItem(this._ITEM_KEY);
    this.user$.next(null);
  }
}

export interface User {
  id: number;
  email: string;
}

function isUser(object: any): object is User {
  return 'id' in object && 'email' in object;
}
