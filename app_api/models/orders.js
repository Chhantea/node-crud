var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    itemName: String,
    seller:String,
    itemImage:String
});




var orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        "default": Date.now
    },
    lists: [listSchema]
});

mongoose.model('Order', orderSchema);