/**
 * Created by awedag on 26.10.17.
 */



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketioJwt = require('socketio-jwt');

const bodyParser = require('body-parser');
const jwt = require('express-jwt');


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
const jwtSecret =  'aklsdjfklöasjdcma8sd90ziklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';

app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "7d", audience :"self", issuer : "school"});
app.set("jwt-validate", {secret: jwtSecret, audience :"self", issuer : "school"});

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  //  res.send('<h1>Hello world</h1>');
});


app.use("/", require('./routes/indexRoutes.js'));

// the jwt-validate copies the jwt-info part to the req to user (see jwt.sign method)
// after this jwt-middleware a token is required!
app.use(jwt( app.get("jwt-validate")));
app.use("/api", require('./routes/appRoutes.js'));


/*
io.sockets.on('connection', socketioJwt.authorize({
    secret: jwtSecret,
    timeout: 5000 // 5 seconds to send the authentication message
  })).on('authenticated', function(socket) {
  //this socket is authenticated, we are good to handle more events from it.
  console.log('connection from name:' + socket.decoded_token.name);
});
*/

io.set('authorization', socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));
io.use(socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));


io.on('connection', function(socket){
    console.log('a user connected');
  //console.log(socket.handshake.decoded_token.name, 'connected');
  //console.log('hello!', socket.handshake.decoded_token.name);

  // in socket.io 1.0
  console.log('hello! ', socket.decoded_token.name);

  // socket.on('disconnect', function(){
   //     console.log('user disconnected');
   // });


  /*
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.broadcast.emit('hi');
*/

  socket.on('chatMessageToSocketServer', function(msg, func){
    console.log('message received:' + msg);
    func("Message recieved!",socket.handshake.query.userName);
    let name = socket.handshake.query.userName;
    let sockectObj = {name,msg}
   // io.emit('broadcastToAll_chatMessage', sockectObj);
    io.emit('broadcastToAll_chatMessage',msg);
  });

 /* socket.on('message', function(msg){
    //  func("Message recieved!",socket.handshake.query.userName);
    console.log('msg received:' + msg);
    let name = 'hans';
    let sockectObj = {name,msg};
    io.emit('broadcastToAll_chatMessage', sockectObj);
  });*/
});


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


/*
*

 var mysql      = require('mysql');
 var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'school',
 password : 'school',
 database : 'school_test'
 //  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
 });

 connection.query('SELECT user_name from users', function(err, rows, fields) {
 if (err) throw err;
 console.log('The solution is: ', rows[1].user_name);
 });

 connection.end();*/
