"use strict";

var db = require('./dbconnection'); //reference of dbconnection.js
var ModelBase = require('./dbModelBase');
var dbUser = require('./dbUser');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');
var moment = require('moment');

const dateZero = new Date("0000-00-00");


function twoDigits(d) {
  if (0 <= d && d < 10) return "0" + d.toString();
  if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
  return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/

Date.prototype.toMysqlFormat = function () {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

class ChatModel extends ModelBase {

  constructor(userId, classId, email, message, sentAt, savedAt) {
    super();
    this.user_id = userId;
    this.class_id = classId;
    this.email = email;
    this.message = message;
    this.sent_at = sentAt;
    this.saved_at = savedAt;
  }
}

// create a user-object from a json-string
function chatFromJson(req) {
  "use strict";
  var r = req;
  return new ChatModel(
    r.user_id,
    r.class_id,
    r.email,
    r.message,
    r.sent_at,
    r.saved_at
  );

}

function insertMessage(email, req, callback) {

  if (!req) {
    callback('500', 'cant insert message to database');
    return;
  }
  const chatModel = chatFromJson(req);

  dbUser.getUserIdByEmail(email, function (err, doc) {
    if ((doc === null ) && !err) {
      callback('401', 'unauthorized');
    }

    //console.dir(req);
    const userId = doc[0].id;
    const classId = doc[0].class_id;
    chatModel.user_id = userId;
    chatModel.email = email;
    chatModel.class_id = classId;

    if (!chatModel.sent_at) {
      chatModel.sent_at = Date.now();
    }
    else if (chatModel.sent_at === dateZero) {
      chatModel.sent_at = Date.now();
    }
    if (!chatModel.saved_at) {
      chatModel.saved_at = (new Date()).toJSON();
    } else if (chatModel.saved_at === dateZero) {
      chatModel.saved_at = (new Date()).toJSON();
    }


    console.log('insertMessagePrepare:' + userId + ' message:' + chatModel.message.slice(0,10) + ' ...:chatmodel.saved_at:' + chatModel.saved_at + ':' + chatModel.sent_at);

    insertMessageDb(userId, classId, chatModel, function (err, doc) {
      if ((doc === null ) && !err) {
        callback('500', 'cant insert message to database');
      }
      else {
        //  console.dir(doc);
        callback(err, chatModel);
      }
    });
  });
}

function getAllMessages(username, callback) {

  console.log('getAllMessages:+' + username);
  return dbUser.getUserIdByEmail(username, function (err, doc) {
    if (err) {
      callback(err, doc);
    }
    else {
      if (!doc) {
        callback(err, doc);
      }
      else {
        if (doc[0].class_id) {

          const c = new ChatModel();
          const sf = c.mySqlGetSelectStatement('chat', 'class_id = ?', {
            'sent_at': dateHelper('sent_at'),
            'saved_at': dateHelper('saved_at')
          });
          return db.query(sf, [doc[0].class_id], function (err, newDoc) {

            if (callback) {
              if (!newDoc) {
                callback(err, []);
                return;
              }
              else if (newDoc.length <= 0) {
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
function dateHelper(dbitem) {
  return `DATE_FORMAT(${dbitem}, "%Y-%m-%dT%TZ") AS ${dbitem}`;
}
function insertMessageDb(userId, classId, chatModel, callback) {
  var sf = "insert into chat (" + chatModel.getClassMembers().join(', ') + ") values( " + chatModel.getStringWithX('?').join(', ') + ")";
  return db.query(sf, chatModel.getAttributeList(), function (err, newDoc) {

    if (callback) {
      if(err) {
        console.log('insertMessageDb: err:' + err);
      }
      callback(err, newDoc);
    }

  });
}

module.exports = {insertMessage, getAllMessages};
