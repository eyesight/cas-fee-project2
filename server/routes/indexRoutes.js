/**
 * Created by awedag on 27.10.17.
 */
const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.post("/api/authenticate", function(req, res){
    console.log('routing...' + req.body.email);
    indexController.login(req,res);
});

module.exports = router;
