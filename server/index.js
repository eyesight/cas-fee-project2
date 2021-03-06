"use strict";

var app = require('express')();
var http = require('http').Server(app);
var chat = require('./controllers/chatController');
var io = require('socket.io')(http);

const socketioJwt = require('socketio-jwt');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cryptoUtil = require('./util/cryptoUtil');
const db=require('./db/dbconnection'); //reference of dbconnection.js

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");

  next();
});

app.use(bodyParser.json());

app.set("jwt-secret", cryptoUtil.jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "2d", audience :"self", issuer : "school"});
app.set("jwt-validate", {secret: cryptoUtil.jwtSecret, audience :"self", issuer : "school"});

// indexRoutes need to work without jwt
app.use("/", require('./routes/indexRoutes.js'));

// the jwt-validate copies the jwt-info part to the req to user (see jwt.sign method)
// after this jwt-middleware a token is required!
app.use(jwt( app.get("jwt-validate")));
app.use("/api", require('./routes/appRoutes.js'));

chat.chat(io);

http.listen(3020, function(){
    console.log('listening on *:3020');
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No token / ..Invalid token provided');
    console.log('Error ERROR error 401');
  }
  else
  {
    console.log(res);
    next(err);
  }
});

