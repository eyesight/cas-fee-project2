/**
 * Created by awedag on 27.10.17.
 */
const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.post('/api/register', function(req, res){
  indexController.register(req,res);
});

router.post("/api/authenticate", function(req, res){
    indexController.login(req,res);
});

router.get("/klasse", function(req, res){
  console.log('dfddfdf'+req);
  indexController.getKlasse(req,res);
});

module.exports = router;
