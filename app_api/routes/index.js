var express = require('express');
var router = express.Router();
var ctrlItem = require('../controllers/item');

// items routes
router.get('/item', ctrlItem.item);
router.post('/item', ctrlItem.itemCreate);
router.put('/item/:itemId', ctrlItem.itemUpdateOne);
router.delete('/item/:itemId', ctrlItem.findOneAndDelete);


module.exports = router;