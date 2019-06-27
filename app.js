var createError = require('http-errors');
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var parse = require('url-parse')
var logger = require('morgan');
var cors = require('cors');
require('./app_api/models/db');
var indexRouter = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
app.use(cors());
const WebSocket = require('ws');
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/frontSide',express.static(path.join(__dirname, 'frontSide'))); //  to add coustom folder
app.use('/dist',express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/api',routesApi);
// app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const wss = new WebSocket.Server({ port: 3000, path: '/foo' });
// wss.broadcast = function broadcast(data) {
//     wss.clients.forEach(function each(client) {
//         client.send(data);
//     });
// };
// wss.on('connection', function connection(ws,req) {
//     const parameters = parse(req.url, true);
//     ws.id = req.headers['sec-websocket-key'];
//     console.log("new connection id--->",ws.id);
//     ws.on('message', function incoming(message) {
//         // wss.broadcast("TO All USERS "+ message);
//         // var data=JSON.parse(message)
//
//         console.log("chk obj",parameters.query.id);
//         var sockeyid=parameters.query.id;
//         wss.clients.forEach(function each(index,client) {
//             if(sockeyid == client.id){
//                 client.send(message);
//             }
//             console.log(client.id)
//         });
//     });
//     // console.log('client size: %s', wss.clients.size);
// });

// wss.broadcast = function broadcast(data) {
//     wss.clients.forEach(function each(client) {
//         // Logger.info('Sending message', data);
//         console.log('received: %s', JSON.stringify(data));
//         client.send(JSON.stringify(data));
//     });
// };

module.exports = app;
