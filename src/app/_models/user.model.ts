export class UserPwd {
  email: string;
  pwd: string;

  constructor(email: string, pwd: string){
    this.email = email;
    this.pwd = pwd;
  }
}
export class UserAuth {
  email: string;
  token: string;

  constructor(email: string, token: string){
    this.email = email;
    this.token = token;
  }
}

export class UserApprove {
  email: string;
  approve: number;
}

export class UserApproveAnswer {
  approve: boolean;
  changed: boolean;
  userItem: User;
}

export class Can {
  features: string[];
}

export class User {
  id: number;
  email: string;
  pwd: string;

  parent_forename: string;
  parent_surname: string;
  parent_gender: string;
  parent_language: string;

  child_forename: string;
  child_surname: string;
  child_date_of_birth: number;
  child_gender: string;

  adress: string;
  zip: number;
  place: string;
  tel_private: number;
  tel_office: number;

  class_id: number;

  is_teacher: number;
  is_admin: number;
  is_approved: boolean;

  klasse_name: string;
  klasse_description: string;
  klasse_start_at: string;
  klasse_end_at: string;
  user_can: Can;
  user_avatar: string;

  getAvatar() {
      return 'data:image/jpeg;base64,' + this.user_avatar;
  }
}


