var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/employeemgmt', function(req, resp) {
    resp.render('employee');
});

router.get('/viewemployees', function(req, resp) {
    resp.render('viewemployees')
});

module.exports = router;
