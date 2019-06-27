
module.exports.index = function(req, res){
    res.render(req.body.template, {data: req.body});
};