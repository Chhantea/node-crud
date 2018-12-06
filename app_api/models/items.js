var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	name: String,
	details: String,
	createdAt: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Item', itemSchema);