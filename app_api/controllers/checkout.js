var paypal = require('paypal-rest-sdk');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.checkout = function(req, res) {
    console.log("dello m")
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AW1oLX4vxRvKUuHZafblNQftrcVCjorEQtqtbbXiyll1ED7bkqK3rymkcM0nBfvq_c3P66zAUf0Y2dAO',
        'client_secret': 'EKXwkMeC0jjVjGBP_nE8znLGd3-_dvjeY7qIZpO9Ee73n5Dap4z9GYNvpcZJm0Bp7oF6tObcyI-P3P2e'
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