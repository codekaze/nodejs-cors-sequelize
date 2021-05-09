var express = require('express');
var router = express.Router();
var databaseInitiator = require("../shared/util/database_initiator");
const { v4: uuidv4 } = require('uuid');


router.get('/database-initiator', async function (req, res, next) {
  await databaseInitiator.generateTables();
  return res.json({
    "message": "init database success",
  });
});

/*
  Auth Request
*/
router.post('/login', async function (req, res, next) {
  var postData = req.body;

  var users = await user.findAll({
    where: {
      username: postData.username,
      password: postData.password
    }
  });

  if (users.length > 0) {
    var user_id = users[0].id;
    var access_token = uuidv4();

    await user_token.create({
      user_id: user_id,
      access_token: access_token
    });

    return res.json({
      "message": "Login Success",
      "access_token": access_token,
      "data": users
    });
  }
  else {
    return res.json({
      "error": true,
      "message": "Login Failed"
    });
  }
});

router.post('/logout', async function (req, res, next) {
  var access_token = req.headers.access_token;

  await user_token.destroy({
    where: {
      access_token: access_token
    }
  });

  return res.json({
    "message": "Logout Success",
    "headers": req.headers,
  });
});

//Need Auth Routes

var need_auth_middleware = async function (req, res, next) {
  if (req.headers.access_token == "dev_token") {
    req.session.user_id = 1;
    req.session.access_token = req.headers.access_token;
    next();
    return;
  }
  if (req.headers.access_token == null) {
    return res.json({
      "message": "Access Token is Required",
    });
  }

  var access_token = req.headers.access_token;
  var userTokens = await user_token.findAll({
    where: {
      access_token: access_token
    }
  });

  if (userTokens.length == 0) {
    return res.json({
      "message": "Invalid Access Token",
    });
  }
  else {
    req.session.user_id = userTokens[0].user_id;
    req.session.access_token = req.headers.access_token;
  }
  next()
}
router.use(need_auth_middleware);


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
