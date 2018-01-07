"use strict";
const klasse = require("../db/dbKlasse");
const dbUser = require("../db/dbUser");
const util = require("../util/security");
const readFiles = require("../util/readFiles");



module.exports.getKlasseListAll = function (req, res) {
  console.log('getKlasseListAll');

  util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST,(authorization) =>  {

    if (authorization) {
      klasse.getKlasseListAll(req.user.name, function (err, order) {
        res.json({classlist:order});
        return;
      });
    } else {
      console.log('getKlasseListAll: not authorized');

      res.status(403).json(false);

    }
  })

};


module.exports.getKlasseAvatarGetAll = function (req, res) {

  console.log('getKlasseAvatarGetAll');

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
        let files = data.map((x) => x.avatar_filename);
        let emails = data.map((x) => x.email);

        readFiles.readManyFiles('./avatars/', files, emails, function (err, data) {

            if (data) {
              let result = data.map((x) => ({
                // filetype is png, jpg
                email: x.email, avatar_filetype: x.filename.match(/[0-9a-z]+$/i)[0], avatar: new Buffer(x.data).toString('base64')
              }));
              res.json({classlistavatar: result});

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

