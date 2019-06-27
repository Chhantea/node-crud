var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    title: {type: String,required: true},
    seller: {type: String,required: true},
    quantity: Number,
    price: Number,
    image: String,
    inventory: Number,
    netprice: Number,
    createdAt: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Cart', cartSchema);