/**
 * Created by awedag on 27.10.17.
 */
const dbUser = require("../db/dbUser");
const util = require("../util/security");
const avatarController = require("./avatarController");
"use strict";

module.exports.updateUser = function(req, res){
    console.log('req.user.name :' + req.user.name);
    dbUser.updateUser(req.user.name,  dbUser.UserFromJson(req), function(err, user) {
        res.json(user);
    });
};

module.exports.getAllUserDetails = function(req, res){
  console.log('getAllUserDetails:req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name,  function(err, user) {
    if (err){
      res.status(400).json(false);

    } else {
      res.json(user);
    }

  });
};


module.exports.getAllUserContents = function(req, res){
  console.log('getAllUserDetails:req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name,  function(err, user) {

    avatarController.avatarGet(req ,(err, avatar) => {

      if (err ){
        console.log('getAllUSERcontentsn avatarGet err:' + err);
        res.status(400).json(false);
      return ;
      }
      res.json({"user_attributes": user,  "user_can": ['chat','classlist','profile'], "user_avatar": avatar });
     // res.json(user);

    })



  });
};


module.exports.getUserKlasseList = function(req, res){
  console.log('KlassenListe');
  dbUser.getUserKlasseList(req.user.name, function(err, order) {
    res.json(order);
  });
};

module.exports.approveUser = function(req, res){
  console.log('Approve User');
  dbUser.approveUser(req.user.name, req, function(err, order) {
    console.log('err:'+ err);
    if (err){
      res.status(err).json(false);

    } else {
      res.json(true);

    }
    /*if (err) {
      res.status(err);
    }
    else {
      res.json(order);
    }*/

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
