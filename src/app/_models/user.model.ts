export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;

  parent_firstname: string;
  parent_lastname: string;
  parent_gender: string;
  parent_language: string;

  child_firstname: string;
  child_lastname: string;
  child_date_of_birth: number;
  child_gender: string;

  adress: string;
  zip: number;
  place: string;
  tel_private: number;
  tel_office: number;
}
