var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var commentSchema = new mongoose.Schema({
   comment: String
});

commentSchema.plugin(mongoosePaginate);

mongoose.model('Comment', commentSchema);