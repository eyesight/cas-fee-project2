const jwt = require('jsonwebtoken');
const dbUser = require('../db/dbUser.js');
const dbKlasse = require('../db/dbKlasse.js');

const authorRoles = {
  CLASSLIST: 'classlist',
  CHAT: 'chat'
}
const standardRoles = [authorRoles.CHAT, authorRoles.CLASSLIST];


function isLoggedIn(req) {
  return req.user != null;
}


function currentUser(req) {
  console.log('req.user.name in currentuser:' + req.user.name);
  return req.user.name;

}


function createSessionToken(name, secret, options, callback) {
  if (!name) {
    console.log('name is empty - cant create token');
    return "";
  }
  //console.log('create token using: ');
  //console.dir(options);
  jwt.sign({name}, secret, options, (err, token) => {
    console.log('token: ' + token);
    callback({email: name, token: token})
  });
}

function handleRegister(req, res) {

  if (isLoggedIn(req)) {
    console.log('security user is logged in');
    res.status("401").json(false);
  }
  else {
    console.log('security is req.body:' + req.body.email);
    if (!req.body.email || !req.body.pwd) {
      //console.dir(req);
      console.log('security register-no-email-nopaassword');
      res.status("401").json(false);

    }
    else {
      dbUser.register(req, function (err, valid) {
        console.log('security register valid?:' + valid);
        if (valid) {
          createSessionToken(req.body.email, req.app.get("jwt-secret"), req.app.get("jwt-sign"), (token) => res.json(token));
        }
        else {
          if (err >= 0 || err != null) {
            res.status(err).json(false);
          }
          else {
            res.status("401").json(false);
          }
        }
      });
    }
  }
}

function handleLogin(req, res) {
  //console.log('handleLogin:' + req.body.email);
  if (isLoggedIn(req)) {
    console.log('security user is logged in');
    res.send(true);
  }
  else {
    console.log('security is req.body:' + !req.body);
    //console.dir(req);
    if (!req.body.email || !req.body.pwd) {
      res.status("401").json(false);
    }
    else {
      dbUser.authenticate(req.body.email, req.body.pwd, function (err, valid) {
        console.log('is valid:' + valid);
        if (valid) {
          createSessionToken(req.body.email, req.app.get("jwt-secret"), req.app.get("jwt-sign"), (authToken) => {

            getUserRoles(req.body.email, (err, roles) => {
              console.log('get user roles');
              authToken.user_can = roles || [];
              res.json(authToken);
              return;
              // res.json(user);
            });
            res.json(token);

          });
        }
        else {
          console.log('security: 401');
          res.status("401").json(false);
        }
      });
    }
  }
}

function handlePasswordChange(req, res) {
  "use strict";
  console.log('passwordchanger on server');
  if (req.body.pwd !== req.body.new_pwd) {
    dbUser.authenticate(req.user.name, req.body.pwd, function (err, valid) {
      console.log('is a valid:' + valid);
      if (valid) {
        dbUser.updatePassword(req.user.name, req.body.new_pwd, function (err, valid) {
          "use strict";
          console.log('err:' + err);
          if (err) {
            res.status('500').json(false);
            return;
          }
          res.json(true);

        });

        //createSessionToken(req.body.email, req.app.get("jwt-secret"), req.app.get("jwt-sign"), (token) => res.json(token));
      }
      else {
        console.log('security: 401');
        res.status("401").json(false);
      }
    });
  }
  else {
    console.log('new pwd is eq old pwd');
    res.status("401").json(false);
  }

}

function getUserRoles(email, callback) {


  dbUser.getUserAuthorizationInfos(email, (err, authorInfos) => {

    if (err) {
      callback(err, []);
      return;
    } else {

      if (authorInfos.is_approved && authorInfos.is_active) {

        callback(false, standardRoles);
        return;
      }
      callback('not authorized for main features', []);

    }

  });
}
function authorizeBackend(email, accessRight, callback) {

  getUserRoles(email, (err, authorRoles) => {


    if (err) {
      callback(false);
    }
    else {

      for (x in authorRoles) {
        console.log(x);
        console.dir(accessRight);

        if (authorRoles[x] === accessRight) {
          callback(true);
          return;
        }
      }

      callback(false);

    }
  });
}

function getKlasseData(req, res) {
  console.log('klassendaten aus security: ' + req);
  return dbKlasse.getAllKlasseData();

}

module.exports = {
  isLoggedIn: isLoggedIn,
  currentUser: currentUser,
  createSessionToken: createSessionToken,
  handleRegister: handleRegister,
  handleLogin: handleLogin,
  handlePasswordChange: handlePasswordChange,
  getUserRoles: getUserRoles,
  authorizesBackend: authorizeBackend,
  authorRoles: authorRoles,
  getKlasseData: getKlasseData
}
;
