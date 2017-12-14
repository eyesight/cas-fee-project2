const multer = require('multer');
//var upload = multer({ storage: multer.memoryStorage({}) })
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const dbUser = require("../db/dbUser");


module.exports.avatarUpload = function (req, res) {
  let raw = new Buffer(req.body.avatar.value.toString(), 'base64');
  console.log('uploadAvatar: filetype is:' + req.body.avatar.filename);

  let filename = req.user.name.replace(/@/i,'.');
  let filetype = [...req.body.avatar.filename.split('.')].pop();
  let fullname =  filename + '.' + filetype;
  console.log('uploadAvatar: filetype is:' + [...req.body.avatar.filename.split('.')].pop() );
  console.log('req.user.name :' + filename);

  fs.writeFile('./avatars/' + filename + '.' + filetype, raw, function (err) {
    if (err) {
      console.log(err);
      res.status(400).json(false);

    }
    else {
      dbUser.updateAvatarFilename(req.user.name,  fullname, function (err) {
        if (err) {
          res.status(400).json(false);
        } else {
          res.json(true);
        }
      })


    }
  });
};

module.exports.avatarGet = function(req,  callback) {
  let filename = req.user.name.replace(/@/i,'.');
  console.log('read avatarks');

  dbUser.getAvatarFilenameByEmail(req.user.name, function( err, data) {
    "use strict";

    if (err){
      res.status(400).json(false);
      return;
    }
    console.log('filename avatar:' + data);
    let fullname = data;

    fs.readFile('./avatars/' + fullname, function( err, data) {

        if (data) {
          console.log('read avatars');
       //   console.dir(data.toString());
          callback(err, new Buffer(data).toString('base64'));
        }else {
          callback('error no data', null);
        }
      }
    );

  });

};
/*
module.exports.avatarSendBar = function(req.res) {

}*/
