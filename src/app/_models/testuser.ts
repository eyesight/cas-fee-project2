import { User } from './user';

export class Testuser extends User {
  constructor() {
    super();
    this.firstName = 'test';
    this.lastName = 'test';
    this.username = 'test';
    this.password = 'test';
    this.id = 0;
  }
}

