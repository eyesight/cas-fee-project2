/**
 * Created by awedag on 27.10.17.
 */
const dbUser = require("../db/dbUser");
const util = require("../util/security");
const avatarController = require("./avatarController");
"use strict";

module.exports.updateUser = function (req, res) {
  console.log('req.user.name :' + req.user.name);
  dbUser.updateUser(req.user.name, dbUser.UserFromJson(req), function (err, user) {
    res.json(user);
  });
};

module.exports.getAllUserDetails = function (req, res) {
  console.log('getAllUserDetails:req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name, function (err, user) {
    if (err) {
      res.status(400).json(false);

    } else {
      res.json(user);
    }

  });
};


module.exports.getAllUserContents = function (req, res) {
  console.log('getAllUserDetails:req.user.name :' + req.user.name);
  dbUser.getAllUserDetails(req.user.name, function (err, user) {

    console.log('getAllUserContents:' + user.email);
    if (err) {
      res.status(400).json(false);
      return;
    }
    avatarController.avatarGet(req, (err, avatar, avatarfilename) => {

      console.log('getAllUserContents:after avatarget:' + user.email);
      // regex: $ matches end of string, i = ignore case
    if(avatarfilename){
      user.avatar_filetype = avatarfilename.match(/[0-9a-z]+$/i)[0];
    }else{
      user.avatar_filetype = null;
    }

      user.user_avatar = avatar || null;

      res.json(user);

    })
    return;

  });
};


module.exports.getUserKlasseList = function (req, res) {
  console.log('KlassenListe');

  util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST,(authorization) =>  {

    if (authorization) {
      dbUser.getUserKlasseList(req.user.name, function (err, order) {
        res.json(order);
        return;
      });
    } else {
      console.log('not authroer');

      res.status(403).json(false);

    }
  })

};
//
// module.exports.getUserKlasseListAvatarsOnly = function (req, res) {
//   console.log('KlassenListe');
//
//   util.authorizesBackend(req.user.name, util.authorRoles.CLASSLIST,(authorization) =>  {
//
//     if (authorization) {
//       dbUser.getUserKlasseList(req.user.name, function (err, order) {
//         res.json(order);
//         return;
//       });
//     } else {
//       console.log('not authroer');
//
//       res.status(403).json(false);
//
//     }
//   })
//
// };

module.exports.approveUser = function (req, res) {
  console.log('Approve User');
  dbUser.approveUser(req.user.name, req, function (err, order) {
    console.log('err:' + err);
    if (err) {
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

module.exports.showUser = function (req, res) {
  dbUser.getUserById(req.params.id, util.currentUser(req), function (err, order) {
    res.json(order);
  });
};

module.exports.deleteUser = function (req, res) {
  dbUser.deleteUser(req.params.id, util.currentUser(req), function (err, order) {
    res.json(order);
  });
};
