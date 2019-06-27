/* GET home page */
module.exports.index = function(req, res){
res.render('index', { title: 'Main' });
};

module.exports.socket = function(ws, req) {
    console.log("is click");
    ws.on('message', function(msg) {
        console.log(msg);
        ws.send(msg)
    });
    console.log('socket', req.testing);
};