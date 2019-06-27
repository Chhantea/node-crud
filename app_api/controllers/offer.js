var mongoose = require('mongoose');
var offerCollection = mongoose.model('Offer');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// create
var addMessage = function (req, res, offer) {
    if (!offer) {
        sendJsonResponse(res, 404, { "message" : "userid not found"});
    } else {
        offer.messages.push({
            offer_price:req.body.offerPrice,
            // counter_offer:req.body.counterOffer,
            message: req.body.message,
            sendby: req.body.sender
        });
        offer.save(function(err, offer) {
            var thisMessage;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisMessage = offer.messages[offer.messages.length - 1];
                sendJsonResponse(res, 201, thisMessage);
            }
        });
    }
};

module.exports.offerCreate = function(req, res) {
    console.log(req.body);
    offerCollection.create({
        user_name: req.body.userName,
        item_name: req.body.itemName,
        item_id: req.body.itemId,
        offer_price: req.body.offerPrice,
        status: "new"
    }, function(err, offer) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, offer);
        }
    });
};

//message Create
module.exports.createMessage = function (req, res) {
    if (req.params && req.params.offerId) {
        offerCollection.findById(req.params.offerId).select('messages').exec(function(err, offer) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                addMessage(req, res, offer);
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No userid in request"});
    }
};

//read all offers
module.exports.readOffers = function (req, res) {
    offerCollection.find().exec(function(err, offers) {
        if (!offers) {
            sendJsonResponse(res, 404, { "message" : "No user found"});
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, offers);
    });
};

//read all message
module.exports.readOfferMessage = function (req, res) {
    if (req.params && req.params.offerId) {
        offerCollection.findById(req.params.offerId).select('messages').exec(function(err, offer) {
            var response;
            if (!offer) {
                sendJsonResponse(res, 404, { "message" : "No offer found"});
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (offer.messages && offer.messages.length > 0) {
                response = {messages : offer.messages};
                sendJsonResponse(res, 200, response);
            } else {
                sendJsonResponse(res, 404, { "message" : "No message found"});
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No offerID in request"});
    }
};


// update
module.exports.offerUpdateOne = function(req, res) {
    if (!req.params.offerId) {
        sendJsonResponse(res, 404, {
            "message": "Not found, offerId is required"
        });
        return;
    }
    offerCollection
        .findById(req.params.offerId)
        .exec(
            function (err, offer) {
                if (!offer) {
                    sendJsonResponse(res, 404, {
                        "message": "cartid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                // cart.inventory = req.body.inventory;
                offer.status = req.body.status;
                offer.save(function (err, offer) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, offer);
                    }
                });
            }
        );
};

module.exports.updateOfferMessage = function (req, res) {
    if (!req.params.offerId || !req.params.messageId) {
        sendJsonResponse(res, 404, { "message" : "Not found, offerId and userId are both required"});
        return;
    }
    offerCollection.findById(req.params.offerId).select('messages').exec(function(err, offer){
        var thisMessage;
        if (!offer) {
            sendJsonResponse(res, 404, { "message" : "OfferId not found"});
            return;
        } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        if (offer.messages && offer.messages.length > 0) {
            thisMessage = offer.messages.id(req.params.messageId);
            if (!thisMessage) {
                sendJsonResponse(res, 404, { "message" : "MessageId not found"});
            } else {
                // thisMessage.message = req.body.message;
                // thisMessage.offer_price = req.body.offerPrice;
                // thisMessage.counter_offer = req.body.counterOffer;
                // thisMessage.sendby = req.body.sender;
                offer.save(function(err, offer){
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, thisMessage);
                    }
                });
            }
        } else {
            sendJsonResponse(res, 404, { "message" : "No address to update"});
        }
    });
};