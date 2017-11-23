/**
 * Created by awedag on 27.10.17.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');
const klasseController = require('../controllers/KlasseController');

router.get('/something', function(req, res, next) {
  console.log('Enter something.');
});

router.put("/user/update", userController.updateUser);
router.get("/user/show", userController.getAllUserDetails);
router.get("/chat/getall", chatController.getMessages);

router.get("/user/klasselist", userController.getUserKlasseList);
router.put("/user/approve", userController.approveUser);

/*
router.post("/api", orders.createUser);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);
*/
module.exports = router;
