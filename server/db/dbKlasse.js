/**
 * Created by awedag on 01.11.17.
 */

var db=require('./dbconnection'); //reference of dbconnection.js
var ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');



class KlasseModel extends ModelBase{

  constructor(name, description, fromdate, todate, teacherid, zip, place){
    super();
    this.class_id = class_id;
    this.user_name = userName;
    this.parent_surname = parentSurname;
    this.parent_forename = parentForename;
    this.child_surname = childSurname;
    this.child_forename = childForename;
    this.child_gender = childGender;
    this.child_date_of_birth = childBirthdate;
    this.adress = adress;
    this.zip = zip;
    this.place = place;
    this.is_active = 1;
  }
}

// create a user-object from a json-string
function UserFromJson(req){
  "use strict";
  var r = req.body;
  return new UserModel(
    r.class_id,
    r.user_name,
    r.parent_surname,
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
