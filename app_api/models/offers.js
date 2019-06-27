var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    offer_price:Number,
    message: String,
    sendby: String,
    status:String,
    createdAt: {
        type: Date,
        "default": Date.now
    }
});

var offerSchema = new mongoose.Schema({
    user_name: String,
    item_name: String,
    item_id: String,
    offer_price: Number,
    status:String,
    latest_update: {
        type: Date,
        "default": Date.now
    },
    messages: [messageSchema]
});

mongoose.model('Offer', offerSchema);