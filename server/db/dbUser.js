/**
 * Created by awedag on 27.10.17.
 */
const db=require('./dbconnection'); //reference of dbconnection.js
const ModelBase = require('./dbModelBase');
const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');



const emailRGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class UserRegister {
  constructor(email, password, isTeacher){
    this.email = email;
    this.encrypted_password = cryptoUtil.hashPwd(password);
    this.is_teacher = isTeacher;
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

function registerUser(email, passwort, isTeacher, req, updateUserFunc, callback)
{
  if(!(email && passwort)) {  callback("no user", null); }

  const user = new UserRegister(email, passwort, isTeacher);


  return db.query("Insert into users ( email, encrypted_password, is_teacher) values(?,?,?)",[user.email, user.encrypted_password, user.is_teacher], function(err, newDoc){
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
// callback(err, res)
// to reject request res must be false!
function register(req, callback){
  console.log('dbUSer.register');
  const email = req.body.email;
  const password = req.body.pwd;
  const isTeacher = req.body.is_teacher;
  console.log('regex email:result:' + emailRGX.test(email));
  if(!(email && password)) {  callback(false, false); }
  if (!emailRGX.test(email)) {
    console.log('callback:regex email:result:' + emailRGX.test(email));

    callback(400,false);
    return;
  }


  this.registerUser(email, password, isTeacher, req, this.updateUser, function(err,doc){
    callback(err,doc);
  });

}

function authenticate(email, password, callback){
  console.log('user.authenticate:' + email);
  if(!(email && password)) {  callback(false); }

  this.getUserByEmail( email , function (err, doc) {
    if( (doc === null ) && !err){
      callback('401', false);
    }
    else {
      var pwd = cryptoUtil.hashPwd(password);
      console.log('passwor: ' + doc[0].encrypted_password + ' paswword: ' + cryptoUtil.hashPwd(password));
      callback(err, doc && doc[0].encrypted_password === cryptoUtil.hashPwd(password));
      //  callback(err, doc && true);
    }

  });
}

function getAllUserDetails(email, callback){

  return db.query("select u.id,  u.email,u.class_id, u.parent_surname, u.parent_forename," +
    "u.child_surname, u.child_forename,u.child_gender, u.child_date_of_birth, u.adress, u.zip, u.place, u.tel_private, u.tel_office, u.is_teacher, "+
    "k.name klasse_name, k.description klasse_description, k.start_at klasse_start_at, k.end_at klasse_end_at, k.teacher_user_id teacher_user_id from users u, klasses k "+
    "where u.class_id = k.id and email=?",[email], function(err, newDoc) {
    if (callback) {
      if (newDoc.length <= 0) {
        newDoc = null;
      }
      else {
        if (newDoc.length > 1) {
          err = 'SQL SEVERE ERROR: more than one entry for user.email:' + email;
        }
      }

      callback(err, newDoc[0]);
    }
  });
}


function getUserKlasseList(email, callback){

  return db.query("select u.id, u.email,u.class_id, u.parent_surname, u.parent_forename," +
    "u.child_surname, u.child_forename,u.child_gender, u.child_date_of_birth,u.adress, u.zip, u.place, u.is_teacher, u.is_approved,  "+
    "k.name klasse_name, k.description klasse_description, k.start_at klasse_start_at, k.end_at klasse_end_at from users u, klasses k "+
    "where u.class_id = k.id and k.id = (select class_id from users where email=?)",[email], function(err, newDoc) {
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
  return db.query("select id, class_id, is_teacher from users where email=?",[email], function(err, newDoc) {
    if (callback) {
      if (newDoc.length <= 0 ) {
        newDoc = null;
      }
      else {
        if (newDoc.length > 1){
          err = 'SQL SEVERE ERROR: more than one entry for user.email:'+email;
        }
      }
      //console.dir(newDoc);
      callback(err, newDoc);
    }
  });
}


function getClassIdByEmail(email,callback){
  console.log('getUserIdByEmail:'+email);
  return db.query("select class_id from users where email=?",[email], function(err, newDoc) {
    if (callback) {
      if (newDoc.length <= 0 ) {
        newDoc = null;
      }
      else {
        if (newDoc.length > 1){
          err = 'SQL SEVERE ERROR: more than one entry for user.email:'+email;
        }
      }
      //console.dir(newDoc);
      callback(err, newDoc[0].class_id);
    }
  });
}


function approveUser(username, req, callback){

  console.log('approveUser - teacher:+'+username);
  return getUserIdByEmail(username, function(err, doc) {
    if (err) {
      callback(err, doc);
    }
    else {
      if (!doc) {
        callback(err, doc);
      }
      else {
        const userEmail = req.body.email;
        const approve = req.body.approve;
        console.log('1:'+doc[0].is_teacher);
        console.log('2:'+ doc[0].class_id);
        console.log('4:'+ userEmail);
        console.log('5:'+ approve);

        if (doc[0].is_teacher && doc[0].class_id && userEmail && approve
          && doc[0].is_teacher === 1
          && (approve === 1 ||approve === 0)){
          console.log('teacher :'+username+ ' approves user:' + userEmail + ' to : '+ approve);

          const sf = 'update users set is_approved = ? where email = ? and class_id = ?';
          //const sf = c.mySqlGetSelectStatement('chat', 'class_id = ?', {'sent_at': dateHelper('sent_at'),'saved_at': dateHelper('saved_at')});
          //console.log('getallMEssages:'+sf);
          return db.query(sf, [approve, userEmail, doc[0].class_id ], function (err2, newDoc) {
            //console.dir(newDoc);

            console.log('newdoc:' + newDoc.affecRows);

            if (callback) {
              if (newDoc) {
                  if (newDoc.affectedRows !== 1) {
                    newDoc = 'ASAS SQL SEVERE ERROR: more than one entry for user.email:' + userEmail;
                    err = 400;
                  }
              }
              callback(err, newDoc);
            }
          });
        } else {
          callback(400, 'invalid Request');
        }
      }
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
  authenticate : authenticate,
  currentUser: currentUser,
  register : register,
  registerUser : registerUser,
  updateUser : updateUser,
  UserFromJson: UserFromJson,
  getUserByEmail : getUserByEmail,
  getUserIdByEmail : getUserIdByEmail,
  getClassIdByEmail: getClassIdByEmail,
  getAllUserDetails: getAllUserDetails,
  getUserKlasseList: getUserKlasseList,
  approveUser: approveUser,
  doQuery: doQuery
};



