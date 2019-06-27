var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//all
module.exports.cart = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Getting All Carts Data");
    Cart.find().exec(function(err,cart){
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
module.exports.cartCreate = function(req, res) {
    console.log(req.body);
    var net = req.body.quantity * req.body.price;
    Cart.create({
        title: req.body.title,
        seller: req.body.seller,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image,
        inventory: req.body.inventory,
        netprice: net
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
// update
module.exports.cartUpdateOne = function(req, res) {
    if (!req.params.cartId) {
        sendJSONresponse(res, 404, {
            "message": "Not found, cartID is required"
        });
        return;
    }
    Cart
        .findById(req.params.cartId)
        .exec(
            function(err, cart) {
                if (!cart) {
                    sendJSONresponse(res, 404, {
                        "message": "cartid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                // cart.inventory = req.body.inventory;
                cart.quantity = req.body.quantity;
                cart.netprice = req.body.netprice;
                cart.save(function(err, item) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, item);
                    }
                });
            }
        );
};
/* DELETE  */
module.exports.findOneAndDelete = function(req, res) {
    var cartId = req.params.cartId;
    if (cartId) {
        Cart
            .findByIdAndRemove(cartId)
            .exec(
                function(err, cart) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("Cart id " + cartId + " deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No itemId"
        });
    }

};