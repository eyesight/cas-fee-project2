/**
 * Created by awedag on 26.10.17.
 */



var app = require('express')();
var http = require('http').Server(app);
var chat = require('./controllers/chatController');
var io = require('socket.io')(http);
const socketioJwt = require('socketio-jwt');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cryptoUtil = require('./util/cryptoUtil');



var db=require('./db/dbconnection'); //reference of dbconnection.js

// test query
const store = require("./db/dbuser");
store.doQuery();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.set("jwt-secret", cryptoUtil.jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "7d", audience :"self", issuer : "school"});
app.set("jwt-validate", {secret: cryptoUtil.jwtSecret, audience :"self", issuer : "school"});

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  //  res.send('<h1>Hello world</h1>');
});


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
    next(err);
  }
});

