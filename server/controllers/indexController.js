/**
 * Created by awedag on 27.10.17.
 */
const util = require('../util/security');


module.exports.register = function(req, res) {
    util.handleRegister(req, res);
};


module.exports.login = function(req, res) {
  util.handleLogin(req, res);
};

