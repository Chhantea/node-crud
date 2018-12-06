var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	name: {type: String, required: true},
	details: {type: String, required: true},
	createdAt: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Item', itemSchema);