"use strict";
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
  indexController.getKlasse(req,res);
});

module.exports = router;
