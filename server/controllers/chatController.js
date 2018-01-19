"use strict";
const socketioJwt = require('socketio-jwt');
const cryptoUtil = require('../util/cryptoUtil');
const dbChat = require('../db/dbChat');
const dbUser = require('../db/dbUser');
const util = require("../util/security");

module.exports.chat = function (io) {

  io.set('authorization', socketioJwt.authorize({
    secret: cryptoUtil.jwtSecret,
    handshake: true
  }));
  io.use(socketioJwt.authorize({
    secret: cryptoUtil.jwtSecret,
    handshake: true
  }));

  io.on('connection', function (socket) {

    // in socket.io 1.0 use decoded_token.name from jwt
    console.log('chat: user connected:', socket.decoded_token.name);
    const email = socket.decoded_token.name;

    util.authorizesBackend(email, util.authorRoles.CHAT, (authorization) => {

      if (authorization) {

        // get chatroom (=class) from user
        dbUser.getClassIdByEmail(email, function (err, classId) {

          if (err) {
            console.log('chat: getClassIdByEmail failed:' + err);
          }
          console.log('chat: getClassIdByEmail: classId:' + classId);
          socket.join(classId);
          socket.on('disconnect', function () {
            console.log('chat: user disconnected');
            socket.leave(classId);
          });

          // listen on channel
          socket.on('chatMessageToSocketServer', function (msg, callback) {
            console.log('message received from (could be faked as client can set this):' + msg.email + ' email from token (couldnt be faked):' + socket.decoded_token.name + ':classRoom:' + classId);

            if (!msg.saved_at) {
              msg.saved_at = (new Date()).toJSON();
            }
            // this is the callback
            dbChat.insertMessage(email, msg, (err, doc) => {
              //  "Message recieved!", socket.decoded_token.name
              if (err) {
                if (err) {
                  callback(err, false);
                } else {
                  callback(500, err);
                }
              } else {
                callback(200, {'server_saved_at': doc.saved_at});
              }
            });

            console.log('socket.decode_token:' + socket.decoded_token.name);
            msg.email = socket.decoded_token.name;
            socket.broadcast.to(classId).emit('broadcastToAll_chatMessage', msg);
          });
        });

      } else {
        console.log('chat: not authorized');
        socket.disconnect(

        );
      }
    });
  });
}

module.exports.getMessages = function (req, res) {
  console.log('getMessages: req.user.name :' + req.user.name);

  util.authorizesBackend(req.user.name, util.authorRoles.CHAT, (authorization) => {

    if (authorization) {
      dbChat.getAllMessages(req.user.name, function (err, messages) {
        res.json(messages);
        return;
      });
    } else {
      console.log('chat: not authorized');
      res.status(401).json(false);

    }
  })
};
