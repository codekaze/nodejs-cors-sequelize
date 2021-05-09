var express = require('express');
var router = express.Router();


router.get('/product', function (req, res, next) {
  return res.json({
    "message": "hello WOrld",
  });
});


module.exports = router;
