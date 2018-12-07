var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlAxio = require('../controllers/axos');
var ctrlReact = require('../controllers/react');
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

module.exports = router;
