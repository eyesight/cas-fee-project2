"use strict";
const klasse = require("../db/dbKlasse");
const util = require("../util/security");



module.exports.getUserKlasseList = function (req, res) {
  console.log('getUserKlasseList');

  util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST,(authorization) =>  {

    if (authorization) {
      dbUser.getUserKlasseList(req.user.name, function (err, order) {
        res.json({classlist:order});
        return;
      });
    } else {
      console.log('getUserKlasseList: not authorized');

      res.status(403).json(false);

    }
  })

};
