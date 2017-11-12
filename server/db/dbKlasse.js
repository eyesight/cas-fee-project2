/**
 * Created by awedag on 01.11.17.
 */

const db=require('./dbconnection'); //reference of dbconnection.js
const ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');



class KlasseModel extends ModelBase{

  constructor(klasseName, klasseDesc, fromdate, todate, teacherId, isActive){
    super();
    this.name = klasseName;
    this.description = klasseDesc;
    this.start_at = fromdate;
    this.end_at = todate;
    this.teacher_user_id = teacherId;
    this.is_active = isActive;
  }
}

// create a user-object from a json-string
function klasseFromJson(req){
  "use strict";
  const r = req.body;
  return new KlasseModel(
    r.name,
    r.description,
    r.start_at,
    r.end_at,
    r.teacher_user_id,
    r.is_active
  );

}

function klasseData(req)
{
  return req;
}

function getAllKlasseData(callback){

  console.log('getklasse from db');
          const c = new KlasseModel();
          const sf = c.mySqlGetSelectStatement('klasses');
          //console.log('getallMEssages:'+sf);
          return db.query(sf, function (err, newDoc) {
            console.dir(newDoc);

            if (callback) {
              if (newDoc.length <= 0) {
                newDoc = null;
              }
              callback(err, newDoc);
            }
          });

}

//database testquery
function doQuery() {
  var gg = new KlasseModel(99,'a','a','a','a','a',1);
  var ggg = Object.keys(gg);
  let sql = "SELECT * FROM klasses";

  console.log(sql);
  return  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });
}
module.exports = {
  doQuery: doQuery,
  getAllKlasseData: getAllKlasseData
};
