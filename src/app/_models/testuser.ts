import { User } from './user.model';

export class Testuser extends User {
  constructor() {
    super();
    this.parent_forename = 'test';
    this.parent_surname = 'test';
    this.email = 'test';
    this.pwd = 'test';
    this.id = 0;
  }
}

