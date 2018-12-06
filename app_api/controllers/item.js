var mongoose = require('mongoose');
var Item = mongoose.model('Item');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.item = function(req, res) {
  console.log("Getting All Items");
 Item.find().exec(function(err,item){
 	if(err){
    console.log(err);
    sendJSONresponse(res, 400, err);
 	}else{
 		console.log(item);
      sendJSONresponse(res, 201, item);
 	}
 });
};

// create
module.exports.itemCreate = function(req, res) {
  console.log(req.body);
  Item.create({
    name: req.body.name,
    details: req.body.details
  }, function(err, item) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(item);
      sendJSONresponse(res, 201, item);
    }
  });
};

/* DELETE  */
module.exports.findOneAndDelete = function(req, res) {
  var itemId = req.params.itemId;
  if (itemId) {
    Item
      .findByIdAndRemove(itemId)
      .exec(
        function(err, item) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Item id " + itemId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No itemId"
    });
  }
};