/**
 * Created by awedag on 27.10.17.
 */
var db=require('./dbconnection'); //reference of dbconnection.js

const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');


// TODO: move to BaseFile
class ModelBase {

  getAttributeList() {
    return Object.values(this);

  }

  getClassMembers() {
    return Object.getOwnPropertyNames(this);
  }

}

class User {

  constructor(email, password){
    this.email = email;
    this.encrypted_password = cryptoUtil.hashPwd(password);
  }
}


class UserModel extends ModelBase{

  constructor(class_id, userName, parentSurname, parentForename, childSurname, childForename, childGender, childBirthdate, adress, zip, place){
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

function publicRegisterUser(email, passwort, callback)
{
  if(!(email && passwort)) {  callback("no user", null); }

  let user = new User(email, passwort);


  return db.query("Insert into users ( email, encrypted_password) values(?,?)",[user.email, user.encrypted_password], function(err, newDoc){
    if(callback){
      callback(err, newDoc);
    }
  });
}

function publicAuthentication(email, passwort, callback){
  if(!(email && passwort)) {  callback(false); }

  this.getUserByEmail( email , function (err, doc) {
    if( (doc === null ) && !err){
      publicRegisterUser(email, passwort, callback);
    }
    else {
      var pwd = cryptoUtil.hashPwd(passwort);
      callback(err, doc && doc[0].encrypted_password === cryptoUtil.hashPwd(passwort));
    }

  });
}


function  getUserByEmail(email,callback){
  return db.query("select encrypted_password, email from users where email=?",[email], function(err, newDoc) {
    if (callback) {
      if (newDoc.length <= 0 ) {
        newDoc = null;
      }
      else {
        if (newDoc.length > 1){
          err = 'SQL SEVERE ERROR: more than one entry for user.email:'+email;
        }
      }


      callback(err, newDoc);
    }
  });
}

function  updateUser(email,user, callback){

  var sf = "update users  set "+user.getClassMembers().join('=?, ')+"=? where email='" + email +"'";
  // [user.getClassMembers()].
  // console.dir(user.getAttributeList());
  return db.query(sf,user.getAttributeList(), function(err, newDoc) {

    if (callback) {
      if (newDoc) {
        console.log('daf:' + newDoc.rows)
      }
      if (err) {
        console.log('err:' + err)
      }
      console.log(err);
      callback(err, newDoc.affectedRows);
    }
  });
}

// get CurrentUser from jwt (jwt writes user into req
function currentUser(req)
{
  return req.user.name;
}


function createSessionToken(name, secret, options, callback)
{
  if(!name){
    return "";
  }
  jwt.sign({ name }, secret, options, (err, token) => callback(token));
}

function handleLogin(req,res)
{
  if (publicIsLoggedIn(req))
  {
    res.send(true);
  }
  else {
    userService.authenticate(req.body.email, req.body.pwd, function (err, valid) {
      if (valid) {
        createSessionToken(req.body.email, req.app.get("jwt-secret"),req.app.get("jwt-sign"),  (token) => res.json(token));
      }
      else{
        res.status("401").json(false);
      }
    });
  }
}

//database testquery
function doQuery() {

  var gg = new UserModel(1,'adf','adf','adf','adf');
  var ggg = Object.keys(gg);
  var z = 'z-String: '+ggg.join(' AW ');
  console.log(z);

  console.dir(Object.keys(z));
  console.log('');

  var bb = '2017-09-10';
  return  db.query("update users  set child_date_of_birth=? where email='heidi@example.com'",
    [bb], function (err, newDoc) {

      console.log( 'ist der error:' + err + db.query.querystring);

    });
}

module.exports = {handleLogin: handleLogin
  , add : publicRegisterUser,
  authenticate : publicAuthentication,
  currentUser: currentUser, updateUser : updateUser,
  UserFromJson: UserFromJson,
  getUserByEmail : getUserByEmail, doQuery: doQuery};



