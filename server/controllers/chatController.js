/**
 * Created by awedag on 06.11.17.
 */

'use strict'
//var http = require('http').Server(app);
const socketioJwt = require('socketio-jwt');
const cryptoUtil = require('../util/cryptoUtil');
const dbChat = require('../db/dbChat');
const dbUser = require('../db/dbUser');

module.exports.chat = function(io)
{

  io.set('authorization', socketioJwt.authorize({
    secret: cryptoUtil.jwtSecret,
    handshake: true
  }));
  io.use(socketioJwt.authorize({
    secret: cryptoUtil.jwtSecret,
    handshake: true
  }));

  io.on('connection', function (socket) {
    console.log('a user connected');
    //console.log(socket.handshake.decoded_token.name, 'connected');
    //console.log('hello!', socket.handshake.decoded_token.name);

    // in socket.io 1.0
    console.log('hello! ', socket.decoded_token.name);
    const email = socket.decoded_token.name;

    dbUser.getClassIdByEmail(email, function (err, classId) {

        if (err) {
          console.log('thats not good: getClassIdByEmail Failed:' + err);
        }
        console.log('getClassIdByEmail:' + classId);
        socket.join(classId);
       socket.on('disconnect', function(){
           console.log('user disconnected');
           socket.leave(classId);
       });

    //  socket.on('klasse', function (room) {
    //    console.log('join klasse:' + room);
    //    socket.join('mymyroom');
//
  //    });
      socket.on('chatMessageToSocketServer', function (msg, callback) {
        console.log('message received from (could be faked):' + msg.email + 'email from token (couldnt be faked):' + socket.decoded_token.name + ':classRoom:' + classId);

        // this is the callback
        dbChat.insertMessage(email, msg, (err,doc) => {
          "Message recieved!", socket.decoded_token.name
          if (err) {
            callback(500,err);
          }else {
            callback(200, {'server_saved_at': doc.saved_at});
          }
        });
        //callback("Message recieved!", socket.decoded_token.name);
        //socket.handshake.query.userName);
       // let name = socket.handshake.query.userName;
       // console.log('sioet:' + socket.handshake.query.userName);
        //let sockectObj = {name, msg}
        console.log('socket.decode_token:'+socket.decoded_token.name);
        msg.email = socket.decoded_token.name;
        // io.emit('broadcastToAll_chatMessage', sockectObj);
        //console.dir('chat message forwarding:', msg);
        //  io.emit('broadcastToAll_chatMessage', msg);
        // const rooms = io.sockets.manager  roo[socket.id];
        //console.dir(socket);
        socket.broadcast.to(classId).emit('broadcastToAll_chatMessage', msg);
      });
    });
  });
}

module.exports.getMessages = function(req, res){
  console.log('req.user.name :' + req.user.name);
  dbChat.getAllMessages(req.user.name, function(err, messages) {
    res.json(messages);
  });
};
