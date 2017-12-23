"use strict"

const multer = require('multer');
//var upload = multer({ storage: multer.memoryStorage({}) })
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const dbUser = require("../db/dbUser");
const util = require("../util/security");

const readFiles = require("../util/readFiles");

module.exports.avatarUpload = function (req, res) {
  let raw = new Buffer(req.body.avatar.value.toString(), 'base64');
  console.log('uploadAvatar: filetype is:' + req.body.avatar.filename);

  let filename = req.user.name.replace(/@/i, '.');
  // get last item, ie: jpg
  let filetype = [...req.body.avatar.filename.split('.')].pop();
  let fullname = filename + '.' + filetype;
  console.log('uploadAvatar: filetype is:' + [...req.body.avatar.filename.split('.')].pop());
  console.log('req.user.name :' + filename);

  fs.writeFile('./avatars/' + filename + '.' + filetype, raw, function (err) {
    if (err) {
      console.log(err);
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

  console.log('read avatarks');

  dbUser.getAvatarFilenameByEmail(req.user.name, function (err, filename) {

    if (err) {
      callback('error no data', null);
      return;
    }
    console.log('filename avatar:' + filename);

    //let fullname = data;

    fs.readFile('./avatars/' + filename, function (err, data) {


        if (data) {
          console.log('read avatars');
          //   console.dir(data.toString());
          callback(err, new Buffer(data).toString('base64'), filename);
        } else {
          callback('error no data', null, null);
        }
      }
    );

  });

};


module.exports.avatarGetAllFromKlasse = function (req, res) {

  console.log('read avatarks form class');

  util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST, (authorization) => {

    if (authorization) {

      dbUser.getAvatarFilenamesByEmail(req.user.name, function (err, data) {

        if (err) {
          res.status(400).json(false);
          return;
        }
        if (data.length <= 0) {
          res.json([]);
          return;
        }
        console.log('filename avatar: - delet this console' + data[0].avatar_filename);
        let files = data.map((x) => x.avatar_filename);
        console.log(files.length);
        let emails = data.map((x) => x.email);
        console.log(emails.length);

        readFiles.readManyFiles('./avatars/', files, emails, function (err, data) {

            if (data) {
              console.log('read avatars from klasse');
              //   console.dir(data.toString());
              let result = data.map((x) => ({
                email: x.email, filename: x.filename, avatar: new Buffer(x.data).toString('base64')
              }));
           //   console.dir(result);
           //   callback(err, new Buffer(data).toString('base64'));
              res.json(result);

            } else {
              res.json([]);

            }
          }
        );
      });

    } else {
      console.log('not authorized');
      res.status(403).json(false);

    }
  })

};

/*
 module.exports.avatarSendBar = function(req.res) {

 }*/
