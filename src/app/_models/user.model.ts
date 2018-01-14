export class UserPwd {
  email: string;
  pwd: string;

  constructor(email: string, pwd: string) {
    this.email = email;
    this.pwd = pwd;
  }
}

export class UserPwdChange {
  new_pwd: string;
  pwd: string;
}

export class Avatar {
  filename: string;
  filetype: string;
  value: string;
  filesize: number;
}
export class UserAvatar {

  name: string;
  avatar: Avatar;
}

export class UserAuth {
  email: string;
  token: string;
  user_can: string[];

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}

export class UserApprove {
  email: string;
  approve: number;
}

export class UserClassListAvatars {
  id: number;
  email: string;
  avatar_filetype: string;
  avatar: string;

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
  tel_private: string;
  tel_office: string;

  class_id: number;

  is_teacher: number;
  is_admin: number;
  is_approved: boolean;

  klasse_name: string;
  klasse_description: string;
  klasse_start_at: string;
  klasse_end_at: string;
  avatar_filetype: string;
  user_avatar: string;
  register_date: Date;

  teacher_user_id: number;
  teacher_surname: string;
  teacher_forename: string;
  teacher_email: string;
  teacher_zip: string;
  teacher_place: string;
  teacher_tel_private: string;
  teacher_tel_office: string;
  teacher_gender: string;

}


