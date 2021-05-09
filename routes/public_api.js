var express = require('express');
var router = express.Router();
var databaseInitiator = require("../shared/util/database_initiator");
const { v4: uuidv4 } = require('uuid');

/*
  GET Request
*/
router.get('/:endpoint', async function (req, res, next) {
  var tableName = req.params.endpoint;

  var userList = await global[tableName].findAll();
  return res.json({
    "data": userList,
    "session": req.session
  });
});


/*
  GET Request
*/
router.get('/:endpoint/:id', async function (req, res, next) {
  var tableName = req.params.endpoint;
  var id = req.params.id;

  var userList = await global[tableName].findAll({
    where: {
      id: id
    }
  });

  return res.json({
    "data": userList[0],
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
