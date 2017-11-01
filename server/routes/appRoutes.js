/**
 * Created by awedag on 27.10.17.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put("/api/user/update", userController.updateUser);


/*
router.post("/api", orders.createUser);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);
*/
module.exports = router;
