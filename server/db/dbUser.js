/**
 * Created by awedag on 27.10.17.
 */
const db=require('./dbconnection'); //reference of dbconnection.js
const ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');


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

function registerUser(email, passwort, req, updateUserFunc, callback)
{
  if(!(email && passwort)) {  callback("no user", null); }

  const user = new User(email, passwort);


  return db.query("Insert into users ( email, encrypted_password) values(?,?)",[user.email, user.encrypted_password], function(err, newDoc){
    if(callback){
      const um = UserFromJson(req);
      if(updateUserFunc !== null){
        updateUserFunc(email, um, callback);
      } else {
        callback(err, newDoc);
      }
    }
  });
}


function updateUser(email, userModel, callback){

  var sf = userModel.mySqlGetUpdateStatement('users'," email='" + email +"'");
  // [user.getClassMembers()].
  // console.dir(user.getAttributeList());
  console.log(sf);
  return db.query(sf,userModel.getAttributeList(), function(err, newDoc) {

    if (callback) {
      if (newDoc) {
        console.log('daf:' + newDoc.affectedRows)
      }
      if (err) {
        console.log('err:' + err)
      }
      console.log(err);
      callback(err, newDoc.affectedRows);
    }
  });
}

function register(req, callback){
  console.log('dbUSer.register');
  const email = req.body.email;
  const password = req.body.pwd;
  if(!(email && password)) {  callback(false); }

  const user = new User(email, password);

  this.registerUser(email, password, req, this.updateUser, function(err,doc){
    callback(err,doc);
  });

}

function authenticate(email, password, callback){
  console.log('user.authenticate:' + email);
  if(!(email && password)) {  callback(false); }

  this.getUserByEmail( email , function (err, doc) {
    if( (doc === null ) && !err){
      callback('401', 'unauthorized');
    }
    else {
      var pwd = cryptoUtil.hashPwd(password);
      console.log('passwor: ' + doc[0].encrypted_password + ' paswword: ' + cryptoUtil.hashPwd(password));
      callback(err, doc && doc[0].encrypted_password === cryptoUtil.hashPwd(password));
    //  callback(err, doc && true);
    }

  });
}

/*function getUserDetails(){

  return db.query("select u.encrypted_password, u.email ,.... k.name, k.valid_fromfrom users u, klasse k  where where user.class_id = k.id and email=?",[email], function(err, newDoc) {
//  doc[0].email,
  }*/

function getUserByEmail(email,callback){
  console.log('db:'+email);
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


function getUserIdByEmail(email,callback){
  console.log('getUserIdByEmail:'+email);
  return db.query("select id, class_id from users where email=?",[email], function(err, newDoc) {
    if (callback) {
      if (newDoc.length <= 0 ) {
        newDoc = null;
      }
      else {
        if (newDoc.length > 1){
          err = 'SQL SEVERE ERROR: more than one entry for user.email:'+email;
        }
      }
      console.dir(newDoc);
      callback(err, newDoc);
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


//database testquery
function doQuery() {



  var gg = new UserModel(1,'adf','adf','adf','adf');
  var ggg = Object.keys(gg);
  var z = 'z-String: '+ggg.join(' AW ');
  //console.log(z);

  //console.dir(Object.keys(z));
  //console.log('');

  var bb = '2017-09-10';
  return  db.query("update users  set child_date_of_birth=? where email='heidi@example.com'",
    [bb], function (err, newDoc) {

      console.log( 'ist der error:' + err + db.query.querystring);

    });
}

 module.exports = {
  add : registerUser,
  authenticate : authenticate,
  currentUser: currentUser,
  register : register,
  registerUser : registerUser,
  updateUser : updateUser,
  UserFromJson: UserFromJson,
  getUserByEmail : getUserByEmail,
  getUserIdByEmail : getUserIdByEmail,
  doQuery: doQuery
};



