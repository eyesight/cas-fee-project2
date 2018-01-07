"use strict";

const db = require('./dbconnection'); //reference of dbconnection.js
const ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');


class KlasseModel extends ModelBase {

  constructor(id, klasseName, klasseDesc, fromdate, todate, teacherId, isActive) {
    super();
    this.id = id;
    this.name = klasseName;
    this.description = klasseDesc;
    this.start_at = fromdate;
    this.end_at = todate;
    this.teacher_user_id = teacherId;
    this.is_active = isActive;
  }
}

function getAllKlasseData(callback) {

  console.log('getklasse from db');
  const c = new KlasseModel();
  const sf = c.mySqlGetSelectStatement('klasses');
  return db.query(sf, function (err, newDoc) {
    console.log(newDoc);

    if (callback) {
      if (newDoc.length <= 0) {
        newDoc = null;
      }
      callback(err, newDoc);
    }
  });
}


function getKlasseListAll(email, callback) {
  console.log('getKlasseListAll:' + email);
  return db.query("select u.id, u.email,u.class_id, u.parent_surname, u.parent_forename, u.parent_forename, u.register_date, u.tel_private, u.tel_office, u.parent_language, " +
    "u.child_surname, u.child_forename,u.child_gender, u.child_date_of_birth,u.adress, u.zip, u.place, u.is_teacher, u.is_approved,  " +
    "k.name klasse_name, k.description klasse_description, k.start_at klasse_start_at, k.end_at klasse_end_at from users u, klasses k,  " +
    "(select class_id, is_teacher from users where email=?) pr1 " +
    "where u.class_id = k.id  and k.id = pr1.class_id  and ( (  pr1.is_teacher = 1) OR (u.is_approved = 1 and pr1.is_teacher = 0))", [email], function (err, newDoc) {
    if (callback) {
      if (newDoc.length <= 0) {
        newDoc = null;
      }
      else {
        if (newDoc.length > 1) {
          err = 'SQL SEVERE ERROR: more than one entry for user.email:' + email;
        }
      }
      callback(err, newDoc);
    }
  });
}

module.exports = {
  getAllKlasseData: getAllKlasseData,
  getKlasseListAll: getKlasseListAll
};
