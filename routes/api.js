var express = require('express');
var router = express.Router();
var databaseInitiator = require("../shared/util/database_initiator");


databaseInitiator.connect();

router.get('/database-initiator', async function (req, res, next) {


  return res.json({
    "message": "init database success",
  });
});

router.get('/:endpoint', async function (req, res, next) {
var tableName = req.params.endpoint;

  var userList = await global[tableName].findAll();
  return res.json({
    "data": userList,
  });
});


module.exports = router;
