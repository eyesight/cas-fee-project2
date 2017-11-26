const multer = require('multer');
//var upload = multer({ storage: multer.memoryStorage({}) })
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');


module.exports.avatarUpload = function (req, res) {
  var raw = new Buffer(req.body.avatar.value.toString(), 'base64')

  console.log('uploadAvatar: ');
  console.log('req.user.name :' + req.user.name);

  fs.writeFile('/tmp/' + req.user.name + '.png', raw, function (err) {
    if (err) {
      res.end('error:' + err);
      return;
    }

    res.end('Success!')
  });
};
/*
module.exports.avatarSendBar = function(req.res) {

}*/
