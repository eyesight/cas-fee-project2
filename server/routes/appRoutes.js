/**
 * Created by awedag on 27.10.17.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');

router.get('/something', function(req, res, next) {
  console.log('Enter something.');
});

router.put("/user/update", userController.updateUser);
router.get("/chat/getall", chatController.getMessages);

/*
router.post("/api", orders.createUser);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);
*/
module.exports = router;
