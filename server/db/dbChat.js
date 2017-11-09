/**
 * Created by awedag on 05.11.17.
 */
"use strict";

var db=require('./dbconnection'); //reference of dbconnection.js
var ModelBase = require('./dbModelBase');
var dbUser = require('./dbUser');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');


class ChatModel extends ModelBase{

  constructor( clientUuid, userId, classId, email, message, sendAt){
    super();
    this.client_uuid = clientUuid;
    this.user_id = userId;
    this.class_id = classId;
    this.email = email;
    this.message = message;
    this.sent_at = sendAt;
  }
}

// create a user-object from a json-string
function chatFromJson(req){
  "use strict";
  var r = req;
  return new ChatModel(
    r.client_uuid,
    r.user_id,
    r.class_id,
    r.email,
    r.message,
    r.sent_at

  );

}

function insertMessage(email, req, callback){


  if (!req){
    callback('500', 'cant insert message to database');
    return;
  }
  const chatModel = chatFromJson(req);

  dbUser.getUserIdByEmail(email , function (err, doc) {
    if( (doc === null ) && !err){
      callback('401', 'unauthorized');
    }

    const userId = doc[0].id;
    const classId = doc[0].classId;
    chatModel.user_id = userId;
    chatModel.email = email;
    chatModel.class_id = classId;
    if (!chatModel.sent_at){
      chatModel.sent_at = Date.now();
    }

    console.log('insertMessagePrepare:' + userId + ' classid:' + classId + 'chatmodel.sent_at:' + chatModel.sent_at);

    insertMessageDb(userId, classId, chatModel, function (err, doc) {
      if( (doc === null ) && !err){
        callback('500', 'cant insert message to database');
      }
      else {
        callback(err, doc);
      }
    });
  });
}

function getAllMessages(username, callback){


  return dbUser.getUserIdByEmail(username, function(err, doc) {
    if (err) {
      callback(err, doc);
    }
    else {
      if (!doc) {
        callback(err, doc);
      }
      else {
        if (doc[0].class_id){
          console.log('answer4');

          const c = new ChatModel();
          const sf = c.mySqlGetSelectStatement('chat', 'class_id = ?');
          //console.log('getallMEssages:'+sf);
          return db.query(sf, [doc[0].class_id], function (err, newDoc) {
            console.dir(newDoc);

            if (callback) {
              if (newDoc.length <= 0) {
                newDoc = null;
              }
              callback(err, newDoc);
            }
          });
        }
      }
    }
  });
}

function insertMessageDb(userId, classId, chatModel, callback )
{
  var sf2 = "insert into chat ("+chatModel.getClassMembers().join(', ')+") values( " + chatModel.getStringWithX('?').join(', ') +")";
  var sf = chatModel.mySqlGetInsertStatement('chat');
  console.log('sf:'+ sf);
  return db.query(sf2,chatModel.getAttributeList(), function(err, newDoc){

    if(callback){
      console.log('err:' + err);
      callback(err, newDoc);
    }

  });
}

module.exports = {insertMessage, getAllMessages};
