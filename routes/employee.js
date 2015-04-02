/**
 * Created by VST on 01-04-2015.
 */
var route = require('express').Router();

//view
route.get('/employeemgmt', function(req, resp) {
    resp.render('employee');
});

//data
route.get('/', function(req, resp) {
    req.db.collection('employee').find().toArray(function(err, items){
       resp.json(items);
    });
});

route.post('/', function(req, resp) {
    console.log(req);
    req.db.collection('employee').insert(req.body, function(err, res) {
        resp.send({msg:'success'});
    })
});

route.delete('/:id', function(req, resp) {
    var id = req.params.id;
    req.db.collection('employee').remove({_id:id}, function(err, res) {
        resp.send({msg:'success'});
    });
});

module.exports = route;

