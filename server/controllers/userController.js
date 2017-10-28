/**
 * Created by awedag on 27.10.17.
 */
const store = require("../db/dbusers");
const util = require("../util/security");


module.exports.updateUser = function(req, res){
    //console.dir(req);
    console.log('req.user.name :' + req.user.name);
    // req.params.id,
    store.updateUser(req.user.name,  store.UserFromJson(req), function(err, user) {
        res.json(user);
    });
};


/*
module.exports.getUsers = function(req, res)
{
    store.getAllUser(util.current(req), function (err, orders) {
        res.json(orders || {});
    })
}; */

/*
module.exports.createUser = function(req, res)
{
    let order = store.addUser(req.body.name, util.current(req), function(err, order) {
        res.json(order);
    });
}; */

module.exports.showUser = function(req, res){
    store.getUserById(req.params.id, util.currentUser(req), function(err, order) {
        res.json(order);
    });
};

module.exports.deleteUser =  function (req, res)
{
    store.deleteUser(  req.params.id, util.currentUser(req), function(err, order) {
        res.json(order);
    });
};
