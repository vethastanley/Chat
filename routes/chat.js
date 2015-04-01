/**
 * Created by VST on 30-03-2015.
 */
var router = require('express').Router();

router.get('/', function (req, res, next) {
    res.render('chat');
});

module.exports = router;
