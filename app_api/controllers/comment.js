var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var mongoosePaginate = require('mongoose-paginate-v2');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//all
module.exports.comment = function(req, res) {
    console.log("params",req.params);
    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount'
    };
    const options = {
        page: parseInt(req.params.page),
        limit: 5,
        customLabels: myCustomLabels
    };
    // Comment.find().exec(function(err,comment){
    //     if(err){
    //         console.log(err);
    //         sendJSONresponse(res, 400, err);
    //     }else{
    //         console.log(cart);
    //         sendJSONresponse(res, 201, comment);
    //     }
    // });
    Comment.paginate({}, options, function(err,result ) {
       console.log("output to be value");
        if(err){
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                }else{
                    console.log(result);
                    sendJSONresponse(res, 201, result);
                }

    });
};

module.exports.create = function(req, res) {
  console.log("this call?");
    Comment.create({
        comment: req.body.comment

    }, function(err, comment) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(comment);
            sendJSONresponse(res, 201, comment);
        }
    });
};