/**
 * Created by awedag on 27.10.17.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');
const avatarController = require('../controllers/avatarController');
const klasseController = require('../controllers/KlasseController');
const security = require('../util/security');

router.get('/something', function(req, res, next) {
  console.log('Enter something.');
});

router.put("/user/update", userController.updateUser);
router.get("/user/show", userController.getAllUserDetails);
router.put("/user/avatar", avatarController.avatarUpload);
router.get("/user/contents", userController.getAllUserContents);

router.get("/chat/getall", chatController.getMessages);

router.get("/user/classlist", userController.getUserKlasseList);
router.get("/user/classlistavatar", avatarController.avatarGetAllFromKlasse);
router.put("/user/approve", userController.approveUser);

router.put("/user/passwordchange", security.handlePasswordChange);


/*
router.post("/api", orders.createUser);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);
*/
module.exports = router;
