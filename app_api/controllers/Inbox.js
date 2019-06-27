var mongoose = require('mongoose');
var inboxCollection = mongoose.model('Inbox');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// create
var addMessage = async function (req, res, inbox) {
    if (!inbox) {
        sendJsonResponse(res, 404, { "message" : "inboxId not found"});
    } else {
        console.log(req.body);
        var t = {
            "message": req.body.message,
            "sendby": req.body.sendby,
            "status": "new"
        };
        var len = req.body.length;
        t.attachment = [];
        for (var i = 0; i < len; i++) {
            t.attachment[i] = await {
                attachmentUrl: req.body['attachment' + (i + 1)]
            };
        }
        inbox.messages.push(t);
        inbox.save(function(err, inbox) {
            var thisMessage;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisMessage = inbox.messages[inbox.messages.length - 1];
                sendJsonResponse(res, 201, thisMessage);
            }
        });
    }
};

module.exports.InboxCreate = function(req, res) {
    console.log(req.body);
    inboxCollection.create({
        senderName: req.body.senderName,
        senderId:req.body.senderId,
        // sendTo:req.body.sendTo,
        sendToId:req.body.sendToId,
        subject:req.body.subject
    }, function(err, inbox) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, inbox);
        }
    });
};

//message Create
module.exports.createMessage = function (req, res) {
    if (req.params && req.params.inboxId) {
        inboxCollection.findById(req.params.inboxId).select('messages').exec(function(err, inbox) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                addMessage(req, res, inbox);
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No inboxId in request"});
    }
};

//read all inbox
module.exports.readInbox = function (req, res) {
    inboxCollection.find().exec(function(err, inbox) {
        if (!inbox) {
            sendJsonResponse(res, 404, { "message" : "No message found"});
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, inbox);
    });
};

//read all message
module.exports.readInboxMessage = function (req, res) {
    if (req.params && req.params.inboxId) {
        inboxCollection.findById(req.params.inboxId).select('messages').exec(function(err, inbox) {
            var response;
            if (!inbox) {
                sendJsonResponse(res, 404, { "message" : "No offer found"});
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (inbox.messages && inbox.messages.length > 0) {
                response = {messages : inbox.messages};
                sendJsonResponse(res, 200, response);
            } else {
                sendJsonResponse(res, 404, { "message" : "No message found"});
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No inboxId in request"});
    }
};


// // update
// module.exports.offerUpdateOne = function(req, res) {
//     if (!req.params.offerId) {
//         sendJsonResponse(res, 404, {
//             "message": "Not found, offerId is required"
//         });
//         return;
//     }
//     offerCollection
//         .findById(req.params.offerId)
//         .exec(
//             function (err, offer) {
//                 if (!offer) {
//                     sendJsonResponse(res, 404, {
//                         "message": "cartid not found"
//                     });
//                     return;
//                 } else if (err) {
//                     sendJsonResponse(res, 400, err);
//                     return;
//                 }
//                 // cart.inventory = req.body.inventory;
//                 offer.status = req.body.status;
//                 offer.save(function (err, offer) {
//                     if (err) {
//                         sendJsonResponse(res, 404, err);
//                     } else {
//                         sendJsonResponse(res, 200, offer);
//                     }
//                 });
//             }
//         );
// };
//
// module.exports.updateOfferMessage = function (req, res) {
//     if (!req.params.offerId || !req.params.messageId) {
//         sendJsonResponse(res, 404, { "message" : "Not found, offerId and userId are both required"});
//         return;
//     }
//     offerCollection.findById(req.params.offerId).select('messages').exec(function(err, offer){
//         var thisMessage;
//         if (!offer) {
//             sendJsonResponse(res, 404, { "message" : "OfferId not found"});
//             return;
//         } else if (err) {
//             sendJsonResponse(res, 400, err);
//             return;
//         }
//         if (offer.messages && offer.messages.length > 0) {
//             thisMessage = offer.messages.id(req.params.messageId);
//             if (!thisMessage) {
//                 sendJsonResponse(res, 404, { "message" : "MessageId not found"});
//             } else {
//                 // thisMessage.message = req.body.message;
//                 // thisMessage.offer_price = req.body.offerPrice;
//                 // thisMessage.counter_offer = req.body.counterOffer;
//                 // thisMessage.sendby = req.body.sender;
//                 offer.save(function(err, offer){
//                     if (err) {
//                         sendJsonResponse(res, 404, err);
//                     } else {
//                         sendJsonResponse(res, 200, thisMessage);
//                     }
//                 });
//             }
//         } else {
//             sendJsonResponse(res, 404, { "message" : "No address to update"});
//         }
//     });
// };