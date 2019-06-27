var mongoose = require('mongoose');
var indexdashboardCollection = mongoose.model('Indexdashboardcontent');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// create
var addContent = async function (req, res, indexStyle) {
    if (!indexStyle) {
        sendJsonResponse(res, 404, { "message" : "Data not found"});
    } else {
        indexStyle.contents.push({
            title: req.body.title,
            imageurl: req.body.imageurl,
            imageLink:req.body.imageLink,
            body: req.body.body
        });
        indexStyle.save(function(err, indexStyle) {
            var thisContent;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisContent = indexStyle.contents[indexStyle.contents.length - 1];
                sendJsonResponse(res, 201, thisContent);
            }
        });
    }
};


module.exports.dashboardContentCreate = function(req, res) {
    console.log(req.body);
    indexdashboardCollection.create({
        order: req.body.order,
        type:  req.body.type,
        name:  req.body.name,
        styleName: req.body.styleName
    }, function(err, content) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, content);
            console.log("output safe?",content)
        }
    });
};

//contents Create
module.exports.createcontents = function (req, res) {
    if (req.params && req.params.styleId) {
        indexdashboardCollection.findById(req.params.styleId).select('contents').exec(function(err, indexStyle) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                addContent(req, res, indexStyle);
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No indexStyleId in request"});
    }
};

//read all content
module.exports.readindexDashboarcontent = function (req, res) {
    indexdashboardCollection.find().exec(function(err, inboxDashboardContent) {
        if (!inboxDashboardContent) {
            sendJsonResponse(res, 404, { "message" : "No Data found"});
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, inboxDashboardContent);
    });
};

module.exports.readContent = function (req, res) {
    if (req.params && req.params.styleId) {
        indexdashboardCollection.findById(req.params.styleId).select('contents').exec(function(err, indexStyle) {
            var response;
            if (!indexStyle) {
                sendJsonResponse(res, 404, { "message" : "No indexStyle found"});
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (indexStyle.contents && indexStyle.contents.length > 0) {
                response = {contents : indexStyle.contents};
                sendJsonResponse(res, 200, response);
            } else {
                sendJsonResponse(res, 404, { "message" : "No content found"});
            }
        });
    } else {
        sendJsonResponse(res, 404, { "message" : "No indexStyle ID in request"});
    }
};

/* DELETE  */
module.exports.findOneAndDelete = function(req, res) {
    var styleId = req.params.styleId;
    if (styleId) {
        indexdashboardCollection
            .findByIdAndRemove(styleId)
            .exec(
                function(err, style) {
                    if (err) {
                        console.log(err);
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log("schedule id " + styleId + " deleted");
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No style index"
        });
    }
};
module.exports.deleteContent = function (req, res) {
    if (!req.params.styleId || !req.params.contentId) {
        sendJsonResponse(res, 404, { "message" : "Not found, styleId and ContentID are both required"});
        return;
    }
    indexdashboardCollection.findById(req.params.styleId).select('contents').exec(function(err, indexDashboard){
        if (!indexDashboard) {
            sendJsonResponse(res, 404, { "message" : "styleId not found"});
            return;
        } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        if (indexDashboard.contents && indexDashboard.contents.length > 0) {
            if (!indexDashboard.contents.id(req.params.contentId)) {
                sendJsonResponse(res, 404, { "message" : "contentId not found"});
            } else {
                indexDashboard.contents.id(req.params.contentId).remove();
                indexDashboard.save(function(err) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 204, null);
                    }
                });
            }
        } else {
            sendJsonResponse(res, 404, { "message" : "No contents to delete"});
        }
    });
};