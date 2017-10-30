import { User } from './user.model';

export class Testuser extends User {
  constructor() {
    super();
    this.parent_forename = 'test';
    this.parent_surname = 'test';
    this.username = 'test';
    this.password = 'test';
    this.id = 0;
  }
}

