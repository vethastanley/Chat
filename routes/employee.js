/**
 * Created by VST on 01-04-2015.
 */
var route = require('express').Router();

//data
route.get('/', function(req, resp) {
    req.db.collection('employee').find().toArray(function(err, items){
       resp.json(items);
    });
});

route.post('/', function(req, resp) {
    var data = {
        empId: req.body.empId,
        name: req.body.name,
        experience: req.body.experience,
        department: req.body.department,
        salary: req.body.salary,
        manager: req.body.manager
    };
    req.db.collection('employee').insert(data, function(err, res) {
        resp.render('employee', {msg:'success'});
    })
});

route.delete('/:empId', function(req, resp) {
    var empId = req.params.empId;
    console.log(empId);
    req.db.collection('employee').remove({empId:empId}, function(err, res) {
        resp.send({msg:'success'});
    });
});

module.exports = route;

