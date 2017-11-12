/**
 * Created by awedag on 06.11.17.
 */

'use strict'
//var http = require('http').Server(app);
const socketioJwt = require('socketio-jwt');
const cryptoUtil = require('../util/cryptoUtil');
const dbChat = require('../db/dbChat');

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


    // socket.on('disconnect', function(){
    //     console.log('user disconnected');
    // });


    socket.on('chatMessageToSocketServer', function (msg, callback) {
      console.log('message received:' + msg);

      // this is the callback
      dbChat.insertMessage(email, msg, () => {"Message recieved!", socket.decoded_token.name} );
      //callback("Message recieved!", socket.decoded_token.name);
      //socket.handshake.query.userName);
      let name = socket.handshake.query.userName;
      let sockectObj = {name, msg}
      // io.emit('broadcastToAll_chatMessage', sockectObj);
      io.emit('broadcastToAll_chatMessage', msg);
    });
  });
}

module.exports.getMessages = function(req, res){
  console.log('req.user.name :' + req.user.name);
  dbChat.getAllMessages(req.user.name, function(err, messages) {
    res.json(messages);
  });
};
