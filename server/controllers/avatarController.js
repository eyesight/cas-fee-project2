const multer = require('multer');
//var upload = multer({ storage: multer.memoryStorage({}) })
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');


module.exports.avatarUpload = function (req, res) {
  let raw = new Buffer(req.body.avatar.value.toString(), 'base64');
  let filename = req.user.name.replace(/@/i,'.');
  console.log('uploadAvatar: ');
  console.log('req.user.name :' + filename);

  fs.writeFile('./avatars/' + filename + '.png', raw, function (err) {
    if (err) {
      res.status(err).json(false);

    }
    else {
      res.json(true);
    }
  });
};

module.exports.avatarGet = function(req,  callback) {
  let filename = req.user.name.replace(/@/i,'.');

  fs.readFile('./avatars/' + filename + '.png', function( err, data) {

    if (data) {
      callback(err, new Buffer(data).toString('base64'));
    }else {
      callback('error no data', null);
    }
  }
  );
};
/*
module.exports.avatarSendBar = function(req.res) {

}*/
