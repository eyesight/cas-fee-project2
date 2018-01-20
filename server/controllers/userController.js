"use strict";
const dbUser = require("../db/dbUser");
const util = require("../util/security");
const avatarController = require("./avatarController");

module.exports.updateUser = function (req, res) {
  console.log('updateUser: req.user.name :' + req.user.name);
  dbUser.updateUser(req.user.name, dbUser.UserFromJson(req), function (err, user) {
    res.json(user);
  });
};

module.exports.getAllUserDetails = function (req, res) {
  console.log('getAllUserDetails: req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name, function (err, user) {
    if (err) {
      res.status(400).json(false);
    } else {
      res.json(user);
    }
  });
};

module.exports.getAllUserContents = function (req, res) {
  console.log('getAllUserDetails:req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name, function (err, user) {

    console.log('getAllUserContents:' + user.email);
    if (err) {
      res.status(400).json(false);
      return;
    }
    avatarController.avatarGet(req, (err, avatar, avatarfilename) => {
      console.log('getAllUserContents:after avatarget:' + user.email);
      // regex: $ matches end of string, i = ignore case
    if(avatarfilename){
      user.avatar_filetype = avatarfilename.match(/[0-9a-z]+$/i)[0];
    }else{
      user.avatar_filetype = null;
    }
      user.user_avatar = avatar || null;
      res.json(user);
    });
    return;
  });
};

module.exports.approveUser = function (req, res) {
  console.log('Approve User: ' + req.body.approve + ' :: ' + req.params.id);

  if (req.body.approve === undefined || req.params.id === 0 ) {
    res.status(500).json(false);
    return;
  }
  dbUser.approveUser(req.params.id, req.user.name, req.body.approve, function (err, order) {
    console.log('err:' + err);
    if (err) {
      res.status(err).json(false);
    } else {
      res.json(true);
    }
  });
};

module.exports.deleteUser = function (req, res) {
  console.log('Delete User');
  dbUser.deleteUser(req.params.id, req.user.name, function (err, order) {
    console.log('err:' + err);
    if (err) {
      res.status(err).json(false);
    } else {
      res.json(true);
    }
  });
};

