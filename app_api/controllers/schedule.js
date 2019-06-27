var mongoose = require('mongoose');
var Schedule = mongoose.model('Schedule');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//all

module.exports.getData = function(req, res) {
    console.log("Getting All Schedule Data");
    Schedule.find().exec(function(err,cart){
        if(err){
            console.log(err);
            sendJSONresponse(res, 400, err);
        }else{
            console.log(cart);
            sendJSONresponse(res, 201, cart);
        }
    });
};

// create
module.exports.scheduleCreate = function(req, res) {
    console.log(req.body);
    var net = req.body.quantity * req.body.price;
    Schedule.create({
        item: req.body.item,
        price: req.body.price,
        status: req.body.status,
        category: req.body.category
    }, function(err, cart) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(cart);
            sendJSONresponse(res, 201, cart);
        }
    });
};

module.exports.scheduleUpdate = function(req, res) {
    if (!req.params.scheduleId) {
        sendJSONresponse(res, 404, {
            "message": "Not found, scheduleId is required"
        });
        return;
    }
    Schedule
        .findById(req.params.scheduleId)
        .exec(
            function(err, schedule) {
                if (!schedule) {
                    sendJSONresponse(res, 404, {
                        "message": "scheduleId not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                // cart.inventory = req.body.inventory;
                schedule.time = req.body.time;
                schedule.category = req.body.category;
                schedule.status = req.body.status;
                schedule.expire=req.body.expire;
                schedule.save(function(err, time) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, time);
                    }
                });
            }
        );
};
/* DELETE  */
module.exports.findOneAndDelete = function(req, res) {
    var scheduleId = req.params.scheduleId;
    if (scheduleId) {
        Schedule
            .findByIdAndRemove(scheduleId)
            .exec(
                function(err, schedule) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("schedule id " + scheduleId + " deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No scheduleId"
        });
    }
};