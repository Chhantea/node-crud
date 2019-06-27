var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
    title: String,
        imageurl: String,
        imageLink: String,
    body: String
    },
    {
        timestamps: true
    });
var dashboardSchema = new mongoose.Schema({
        order: Number,
        type:String,
        styleName:String,
       name: String,
        contents:[contentSchema]
    },
    {
        timestamps: true
    });

mongoose.model('Indexdashboardcontent', dashboardSchema);