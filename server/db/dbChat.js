/**
 * Created by awedag on 05.11.17.
 */

var db=require('./dbconnection'); //reference of dbconnection.js
var ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');


class ChatModel extends ModelBase{

  constructor(id, userId, classId, email, message, sendAt){
    super();
    this.id = id;
    this.user_id = userId;
    this.class_id = classId;
    this.email = email;
    this.message = message;
    this.sent_at = sendAt;
  }
}

// create a user-object from a json-string
function UserFromJson(req){
  "use strict";
  var r = req.body;
  return new UserModel(
    r.id,
    r.user_id,
    r.class_id,
    r.email,
    r.parent_forename,
    r.child_surname,
    r.child_forename,
    r.child_gender,
    r.child_date_of_birth,
    r.adress,
    r.zip,
    r.place
  );

}
