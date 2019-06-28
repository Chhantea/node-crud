var mongoose = require('mongoose');
var paypal = require('paypal-rest-sdk');
var recordList = mongoose.model('Record');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.checkout = function(req, res) {
    console.log("dello m")
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': '#',
        'client_secret': '#'
    });
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4000/success",
            "cancel_url": "http://localhost:4000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            // sendJsonResponse(res, 200, {"payment" : payment});
           for(let i = 0;i<payment.links.length;i++){
               if(payment.links[i].rel === 'approval_url'){
                   res.redirect(payment.links[i].href);
               }
           }
        }
    });
};

module.exports.psuccess = function(req, res, next) {
    // var data = req.body.toString();
    recordList.create({
        record:   JSON.stringify(req.body)
    }, function(err, recordList) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, recordList);
        }
    });

};