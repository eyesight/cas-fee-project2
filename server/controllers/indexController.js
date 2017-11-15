/**
 * Created by awedag on 27.10.17.
 */
const util = require('../util/security');
const dbKlasse = require('../db/dbKlasse');

module.exports.register = function(req, res) {
  console.log('indexController register' + req + res);
    util.handleRegister(req, res);
};


module.exports.login = function(req, res) {
  console.log('login');
  util.handleLogin(req, res);
};

module.exports.getKlasse = function(req, res) {
  util.getKlasseData();
};

module.exports.getKlasse = function(req, res){
  dbKlasse.getAllKlasseData( function(err, klasses) {
    res.json(klasses);
  });
};
