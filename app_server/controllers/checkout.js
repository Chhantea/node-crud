var paypal = require('paypal-rest-sdk');

module.exports.index = function(req, res){
    res.render('checkout', { title: 'Checkout' });
};