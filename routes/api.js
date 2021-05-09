var express = require('express');
var router = express.Router();
var databaseInitiator = require("../shared/util/database_initiator");

router.get('/database-initiator', async function (req, res, next) {

  await databaseInitiator.connect();

  return res.json({
    "message": "init database success",
  });
});

router.get('/product', function (req, res, next) {
  return res.json({
    "message": "hello WOrld",
  });
});


module.exports = router;
