/**
 * Created by awedag on 27.10.17.
 */
const dbUser = require("../db/dbUser");
const util = require("../util/security");


module.exports.updateUser = function(req, res){
    console.log('req.user.name :' + req.user.name);
    dbUser.updateUser(req.user.name,  dbUser.UserFromJson(req), function(err, user) {
        res.json(user);
    });
};

module.exports.getAllUserDetails = function(req, res){
  console.log('getAllUserDetails:req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name,  function(err, user) {
    res.json(user);
  });
};


module.exports.getUserKlasseList = function(req, res){
  console.log('KlassenListe');
  dbUser.getUserKlasseList(req.user.name, function(err, order) {
    res.json(order);
  });
};

/*
module.exports.getUsers = function(req, res)
{
    store.getAllUser(util.currentUser(req), function (err, orders) {
        res.json(orders || {});
    })
}; */

/*
module.exports.createUser = function(req, res)
{
    let order = store.addUser(req.body.name, util.currentUser(req), function(err, order) {
        res.json(order);
    });
}; */

module.exports.showUser = function(req, res){
    dbUser.getUserById(req.params.id, util.currentUser(req), function(err, order) {
        res.json(order);
    });
};

module.exports.deleteUser =  function (req, res)
{
    dbUser.deleteUser(  req.params.id, util.currentUser(req), function(err, order) {
        res.json(order);
    });
};
