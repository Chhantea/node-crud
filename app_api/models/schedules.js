var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
    item: String,
    time: {
        type: Date,
        "default": Date.now
    },
    price: Number,
    status: "",
    category: String,
    expire: Date
});

mongoose.model('Schedule', scheduleSchema);