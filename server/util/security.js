const jwt = require('jsonwebtoken');
const dbUser = require('../db/dbUser.js');

function isLoggedIn(req)
{
    return req.user != null;
}


function currentUser(req)
{
    console.log('req.user.name in currentuser:' + req.user.name);
    return req.user.name;

}


function createSessionToken(name, secret, options, callback)
{
    if(!name){
        return "";
    }
    jwt.sign({ name }, secret, options, (err, token) => callback({email: name, token: token} ));
}

function handleLogin(req,res)
{
    //console.log('handleLogin:' + req.body.email);
    if (isLoggedIn(req))
    {
        console.log('user is logged in');
        res.send(true);
    }
    else {
      console.log('is req.body:' + !req.body);
      //console.dir(req);
      if (!req.body.email || !req.body.pwd)
      {
          res.status("401").json(false);

      }
      else  {


        dbUser.authenticate(req.body.email, req.body.pwd, function (err, valid) {
            if (valid) {
                createSessionToken(req.body.email, req.app.get("jwt-secret"),req.app.get("jwt-sign"),  (token) => res.json(token));
            }
            else{
                res.status("401").json(false);
            }
        });
    } }
}

module.exports = {isLoggedIn : isLoggedIn,
    currentUser : currentUser,
    createSessionToken : createSessionToken,
    handleLogin : handleLogin};
