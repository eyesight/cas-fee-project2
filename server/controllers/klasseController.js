"use strict";
const klasse = require("../db/dbKlasse");
const util = require("../util/security");

module.exports.showKlasse = function(req, res){
  console.log('klasseControler');

  // util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST,(authorization) =>  {
  //
  //   klasse.getAllKlasseData(function(err, order) {
  //   res.json(order);
  // });
};
