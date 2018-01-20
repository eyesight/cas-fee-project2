import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {
  }

  public write(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public read(key: string ): any {
    const obj: any = localStorage.getItem(key);
    return obj ?  JSON.parse(obj) : null;

  }
  public remove(key: string) {
    localStorage.removeItem(key);
  }
}

export const StorageKeys = {
  keyCurrentUser : 'currentUser',
  keyCurrentUserContent : 'currentUserContent',
  keyCurrentUserClasslistAvatars : 'currentUserClasslistAvatars'

};
