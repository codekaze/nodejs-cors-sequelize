var express = require('express');
var router = express.Router();
var databaseInitiator = require("../shared/util/database_initiator");


databaseInitiator.connect();

router.get('/database-initiator', async function (req, res, next) {


  return res.json({
    "message": "init database success",
  });
});

/*
  GET Request
*/
router.get('/:endpoint', async function (req, res, next) {
  var tableName = req.params.endpoint;

  var userList = await global[tableName].findAll();
  return res.json({
    "data": userList,
  });
});

/*
  POST Request
*/
router.post('/:endpoint', async function (req, res, next) {
  var tableName = req.params.endpoint;

  var postData = req.body;
  var newData = await global[tableName].create(postData);

  return res.json({
    "message": "Success",
    "data": newData
  });
});

/*
  DELETE Request
*/
router.delete('/:endpoint/:id', async function (req, res, next) {
  var tableName = req.params.endpoint;
  var id = req.params.id;

  var results = await global[tableName].destroy({
    where: {
      id: id
    }
  });

  return res.json({
    "message": "Success",
    "data": results
  });
});

/*
  UPDATE Request
*/
router.put('/:endpoint/:id', async function (req, res, next) {
  var tableName = req.params.endpoint;
  var id = req.params.id;

  var postData = req.body;
  var updatedData = await global[tableName].update(postData, {
    where: {
      id: id
    }
  });

  return res.json({
    "message": "Success",
    "data": updatedData
  });
});


module.exports = router;
