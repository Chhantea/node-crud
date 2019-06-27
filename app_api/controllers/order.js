var mongoose = require('mongoose');
var orderCollection = mongoose.model('Order');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// create
var listItem = function (req, res, order) {
    if (!order) {
        sendJsonResponse(res, 404, { "message" : "OrderId not found"});
    } else {
        order.lists.push({
            // offer_price:req.body.offerPrice,
            // // counter_offer:req.body.counterOffer,
            // message: req.body.message,
            // sendby: req.body.sender
            itemName: req.body.itemName,
            seller:req.body.seller,
            itemImage:req.body.itemImage
        });
        order.save(function(err, order) {
            var thisList;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisList = order.lists[order.lists.length - 1];
                sendJsonResponse(res, 201, thisList);
            }
        });
    }
};

module.exports.orderCreate = function(req, res) {
    console.log(req.body);
    orderCollection.create({
        // user_name: req.body.userName,
        // item_name: req.body.itemName,
        // item_id: req.body.itemId,
        // offer_price: req.body.offerPrice,
        // status: "new"
    }, function(err, order) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, order);
        }
    });
};
//list Create
module.exports.createList = function (req, res) {
    if (req.params && req.params.orderId) {
        orderCollection.findById(req.params.orderId).select('lists').exec(function(err, order) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                listItem(req, res, order);
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No OrderID in request"});
    }
};

//read all orders
module.exports.readOrders = function (req, res) {
    orderCollection.find().exec(function(err, order) {
        if (!order) {
            sendJsonResponse(res, 404, { "message" : "No order found"});
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, order);
    });
};

//read all listitem
module.exports.readOrderList = function (req, res) {
    if (req.params && req.params.orderId) {
        orderCollection.findById(req.params.orderId).select('lists').exec(function(err, order) {
            var response;
            if (!order) {
                sendJsonResponse(res, 404, { "message" : "No offer found"});
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (order.lists && order.lists.length > 0) {
                response = {lists : order.lists};
                sendJsonResponse(res, 200, response);
            } else {
                sendJsonResponse(res, 404, { "message" : "No List found"});
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No orderID in request"});
    }
};
//read only one item
module.exports.readOrderItem = function (req, res) {
    if (req.params && req.params.orderId && req.params.listId) {
        orderCollection.findById(req.params.orderId).select('lists').exec(function(err, order) {
            var response, list;
            if (!order) {
                sendJsonResponse(res, 404, { "message" : "No order found"});
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (order.lists && order.lists.length > 0) {
                list = order.lists.id(req.params.listId);
                if (!list) {
                    sendJsonResponse(res, 404, { "message" : "addressid not found"});
                    return;
                } else {
                    response = {list : list};
                }
                sendJsonResponse(res, 200, response);
            } else {
                sendJsonResponse(res, 404, { "message" : "No list found"});
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "Not found, orderId and listId are both required"});
    }
};