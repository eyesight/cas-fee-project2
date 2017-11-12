/**
 * Created by awedag on 05.11.17.
 */
"use strict";

var db=require('./dbconnection'); //reference of dbconnection.js
var ModelBase = require('./dbModelBase');
var dbUser = require('./dbUser');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');
var moment = require('moment');

const dateZero = new Date("0000-00-00");


function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

class ChatModel extends ModelBase{

  constructor( clientUuid, userId, classId, email, message, sendAt){
    super();
    this.client_uuid = clientUuid;
    this.user_id = userId;
    this.class_id = classId;
    this.email = email;
    this.message = message;
    this.sent_at = sendAt;
    //this.sent_at = new Date(sendAt).toISOString().slice(0, 19).replace('T', ' ');
    //this.sent_at = require('moment')(sendAt).format('YYYY-MM-DD HH:mm:ss');
    console.log('origindate:'+sendAt+'.date:' + moment(new Date(sendAt)).format('YYYY-MM-DD HH:mm:ss'));
      //new Date(sendAt).toISOString().slice(0, 19).replace('T', ' '));
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

    console.dir(req);
    const userId = doc[0].id;
    const classId = doc[0].class_id;
    chatModel.user_id = userId;
    chatModel.email = email;
    chatModel.class_id = classId;
    console.log('sent_at:'+chatModel.sent_at);
    if (!chatModel.sent_at){
      chatModel.sent_at = Date.now();
    }
    else if (chatModel.sent_at === dateZero){
      chatModel.sent_at = Date.now();
    }

    console.log('insertMessagePrepare:' + userId + ' message:' + chatModel.message + ':chatmodel.sent_at:' + chatModel.sent_at);

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

  console.log('getallMessage:+'+username);
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
