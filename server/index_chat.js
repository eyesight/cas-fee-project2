/**
 * Created by awedag on 27.10.17.
 */
"use strict";
let express = require("express");
var path = require('path');
let chat_app = require('express')();
let http = require('http').Server(chat_app);
let io = require('socket.io')(http);
let clientListNames = [];


console.log(__dirname);
chat_app.use(express.static(__dirname));
//chat_app.use(express.static(__dirname, '/server/'));
//chat_app.use(express.static(__dirname + "/..", '/client/'));
chat_app.use(express.static(__dirname + '/node_modules'));


chat_app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*
chat_app.get('/chat', function(req, res){
  res.redirect('/');
}); */



// - CHAT
io.on('connection', function(socket){
  console.log('connection wanted');
  clientListNames.push(socket.handshake.query.userName);
  io.emit("updateSocketList", clientListNames);
  io.emit("addUserToSocketList",socket.handshake.query.userName);

  socket.on('disconnect', function(){
    let name=socket.handshake.query.userName;
    let userIndex = clientListNames.indexOf(socket.handshake.query.userName);
    if (userIndex != -1) {
      clientListNames.splice(userIndex, 1);
      io.emit("updateSocketList", clientListNames);
      io.emit("removeUserFromSocketList",name);
    }
  });

  socket.on('chatMessageToSocketServer', function(msg, func){
    func("Message recieved!",socket.handshake.query.userName);
    let name = socket.handshake.query.userName;
    let sockectObj = {name,msg}
    io.emit('broadcastToAll_chatMessage', sockectObj);
  });

  socket.on('message', function(msg){
    //  func("Message recieved!",socket.handshake.query.userName);
    console.log('msg received:' + msg);
    let name = 'hans';
    let sockectObj = {name,msg};
    io.emit('broadcastToAll_chatMessage', sockectObj);
  });
});

http.listen(3100, function(){
  console.log('listening on *:3100');
});