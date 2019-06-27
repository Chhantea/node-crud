var mongoose = require('mongoose');

var attachmentSchema = new mongoose.Schema({
       attachmentUrl: String
    });
var messageSchema = new mongoose.Schema({
    message: String,
    sendby: String,
    status:String,
    attachment: [attachmentSchema],
    createdAt: {
        type: Date,
        "default": Date.now
    }
});
var inboxSchema = new mongoose.Schema({
    senderName: String,
    senderId:String,
    refItemId:String,
    sendToId:String,
    subject:String,
    messages:[messageSchema]
},
    {
        timestamps: true
    });

mongoose.model('Inbox', inboxSchema);