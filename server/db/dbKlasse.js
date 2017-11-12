/**
 * Created by awedag on 01.11.17.
 */

var db=require('./dbconnection'); //reference of dbconnection.js
var ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');



class KlasseModel extends ModelBase{

  constructor(name, description, fromdate, todate, teacherId){
    super();
    this.id = null;
    this.name = name;
    this.description = description;
    this.start_at = fromdate;
    this.end_at = todate;
    this.teacher_id = teacherId;
    this.is_active = 1;
  }
}

// create a user-object from a json-string
function KlasseFromJson(req){
  "use strict";
  var r = req.body;
  return new UserModel(
    r.name,
    r.description,
    r.fromdate,
    r.todate,
    r.teacherId
  );

}

function getAllKlasses(username, callback){

  console.log('getallMessage:+'+username);

  const c = new KlasseModel();
  const sf = c.mySqlGetSelectStatement('klasses');
  return db.query(sf,null, function (err, newDoc) {
    console.dir(newDoc);

    if (callback) {
      if (newDoc.length <= 0) {
        newDoc = null;
      }
      console.dir(newDoc);
      callback(err, newDoc);
    }
  });

}


module.exports = {getAllKlasses};
