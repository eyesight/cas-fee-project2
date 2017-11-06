/**
 * Created by awedag on 05.11.17.
 */
"use strict";

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
function ChatFromJson(req){
  var r = req.body;
  return new UserModel(
    r.id,
    r.user_id,
    r.class_id,
    r.email,
    r.message,
    r.sent_at

  );

}
