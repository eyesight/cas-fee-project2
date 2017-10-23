import { User } from './user.model';

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

