"use strict";
const security = require('../util/security');
const dbKlasse = require('../db/dbKlasse');

module.exports.register = function(req, res) {
  console.log('indexController register' + req + res);
    security.handleRegister(req, res);
};


module.exports.login = function(req, res) {
  console.log('login');
  security.handleLogin(req, res);
};

module.exports.getKlasse = function(req, res) {
  security.getKlasseData();
};

module.exports.getKlasse = function(req, res){
  dbKlasse.getAllKlasseData( function(err, klasses) {
    res.json(klasses);
  });
};
