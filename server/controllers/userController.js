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

module.exports.getUserKlasseList = function (req, res) {
  console.log('KlassenListe');

  util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST,(authorization) =>  {

    if (authorization) {
      dbUser.getUserKlasseList(req.user.name, function (err, order) {
        res.json(order);
        return;
      });
    } else {
      console.log('getUserKlasseList: not authorized');

      res.status(403).json(false);

    }
  })

};

module.exports.approveUser = function (req, res) {
  console.log('Approve User');
  dbUser.approveUser(req.user.name, req, function (err, order) {
    console.log('err:' + err);
    if (err) {
      res.status(err).json(false);

    } else {
      res.json(true);

    }
  });
};

