var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
    record: String
});

mongoose.model('Record', recordSchema);