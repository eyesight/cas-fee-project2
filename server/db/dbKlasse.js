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


module.exports = {
  getAllKlasseData: getAllKlasseData
};
