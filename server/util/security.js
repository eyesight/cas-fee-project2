const jwt = require('jsonwebtoken');
const userService = require('../db/dbusers.js');

function publicIsLoggedIn(req)
{
    console.log(req);
    console.log('publicIsLoggedNid?' + req.user);
    return req.user != null;
}

function authenticated(req, res, next){

    if(publicIsLoggedIn(req))
    {
        next();
    }
    else
    {
        res.status(401).send(false);
    }
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
    jwt.sign({ name }, secret, options, (err, token) => callback(token));
}

function handleLogin(req,res)
{
    console.log('handleLogin:' + req.body.email);
    if (publicIsLoggedIn(req))
    {
        console.log('uesr is logged ind');
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

module.exports = {isLoggedIn : publicIsLoggedIn,
    handleAuthenticate :authenticated ,
    current : currentUser,
    createToken : createSessionToken,
    handleLogin : handleLogin};