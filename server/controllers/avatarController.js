"use strict";

const multer = require('multer');
const fs = require('fs');
const dbUser = require("../db/dbUser");
const util = require("../util/security");

module.exports.avatarUpload = function (req, res) {
  let raw = new Buffer(req.body.avatar.value.toString(), 'base64');
  let filename = req.user.name.replace(/@/i, '.');
  // get last item if path, ie: jpg
  let filetype = [...req.body.avatar.filename.split('.')].pop();
  let fullname = filename + '.' + filetype;

  fullname = fullname.toLowerCase();
  fs.writeFile('./avatars/' + filename + '.' + filetype, raw, function (err) {
    if (err) {
      console.log('avatarUpload: err:' + err);
      res.status(400).json(false);
    }
    else {
      dbUser.updateAvatarFilename(req.user.name, fullname, function (err) {
        if (err) {
          res.status(400).json(false);
        } else {
          res.json(true);
        }
      })
    }
  });
};

module.exports.avatarGet = function (req, callback) {

  dbUser.getAvatarFilenameByEmail(req.user.name, function (err, filename) {
    if (err) {
      callback('avatarGet: error no data', null);
      return;
    }
    if (!filename) {
        callback('error no data', null, null);
        return;
    }
    filename = filename.toLowerCase();
    fs.readFile('./avatars/' + filename, function (err, data) {

        if (data) {
          callback(err, new Buffer(data).toString('base64'), filename);
        } else {
          callback('error no data', null, null);
        }
      }
    );
  });
};

