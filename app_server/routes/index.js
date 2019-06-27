var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlAxio = require('../controllers/axos');
var ctrlReact = require('../controllers/react');
var ctrlMailler=require('../controllers/mailler');
var ctrlCheckout=require('../controllers/checkout');
// require('express-ws')(express);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// }); 
// above is generate eg

// var homepageController = function (req, res) {
// res.render('index', { title: 'Home' });
// };
// /* GET home page. */
// router.get('/', homepageController);

// another way
router.get('/', ctrlMain.index);
router.get('/axos',ctrlAxio.main);
router.get('/react',ctrlReact.index);
router.post('/template',ctrlMailler.index);
router.get('/checkout',ctrlCheckout.index);
// router.post('/mail',ctrlEmail.mail);

module.exports = router;
