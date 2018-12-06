var express = require('express');
var router = express.Router();
var ctrlItem = require('../controllers/item');

// items routes
router.get('/item', ctrlItem.item);
router.post('/item', ctrlItem.itemCreate);
router.delete('/item/:itemId', ctrlItem.itemDelete);


module.exports = router;