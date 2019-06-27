var express = require('express');
var router = express.Router();
var ctrlItem = require('../controllers/item');
var ctrlCart =require('../controllers/cart');
var ctrlComment = require('../controllers/comment');
var ctrlSchedule = require('../controllers/schedule');
var ctrlOffer = require('../controllers/offer');
var ctrlOrder = require('../controllers/order');
var ctrlInbox = require('../controllers/Inbox');
var ctrlindexdashboardcontent = require('../controllers/indexdashboardcontent');
var ctrlCheckout = require('../controllers/checkout');

// items routes
router.get('/item', ctrlItem.item);
router.get('/item/:itemId',ctrlItem.itemShow);
router.post('/item', ctrlItem.itemCreate);
router.put('/item/:itemId', ctrlItem.itemUpdateOne);
router.delete('/item/:itemId', ctrlItem.findOneAndDelete);

//cart routes
router.get('/cart', ctrlCart.cart);
router.post('/cart', ctrlCart.cartCreate);
router.put('/cart/:cartId', ctrlCart.cartUpdateOne);
router.delete('/cart/:cartId', ctrlCart.findOneAndDelete);

//comment routes for test paginate
router.get('/comment/:page', ctrlComment.comment);
router.post('/comment', ctrlComment.create);

//schedules
router.get('/schedule', ctrlSchedule.getData);
router.post('/schedule', ctrlSchedule.scheduleCreate);
router.put('/schedule/:scheduleId',ctrlSchedule.scheduleUpdate);
router.delete('/schedule/:scheduleId',ctrlSchedule.findOneAndDelete);

//Offer
router.post('/offer', ctrlOffer.offerCreate);
router.get('/offer', ctrlOffer.readOffers);
router.put('/offer/:offerId',ctrlOffer.offerUpdateOne);

//message
router.post('/offer/:offerId/message',ctrlOffer.createMessage);
router.get('/offer/:offerId/message',ctrlOffer.readOfferMessage);
router.put('/offer/:offerId/message/:messageId', ctrlOffer.updateOfferMessage);

//order
router.post('/order', ctrlOrder.orderCreate);
router.get('/order', ctrlOrder.readOrders);
//read orderlist
router.post('/order/:orderId/list',ctrlOrder.createList);
router.get('/order/:orderId/list',ctrlOrder.readOrderList);
router.get('/order/:orderId/:listId',ctrlOrder.readOrderItem);

//inbox
router.post('/inbox', ctrlInbox.InboxCreate);
router.get('/inbox', ctrlInbox.readInbox);

//message
router.post('/inbox/:inboxId/message',ctrlInbox.createMessage);
router.get('/inbox/:inboxId/message',ctrlInbox.readInboxMessage);

//index dashboard content start
//index
router.post('/contentdashboard', ctrlindexdashboardcontent.dashboardContentCreate);
router.get('/contentdashboard', ctrlindexdashboardcontent.readindexDashboarcontent);
router.delete('/contentdashboard/:styleId', ctrlindexdashboardcontent.findOneAndDelete);
//content
router.post('/contentdashboard/:styleId/content',ctrlindexdashboardcontent.createcontents);
router.get('/contentdashboard/:styleId/content',ctrlindexdashboardcontent.readContent);
router.delete('/contentdashboard/:styleId/content/:contentId',ctrlindexdashboardcontent.deleteContent);
//end
//checkout
router.post('/checkout',ctrlCheckout.checkout);

module.exports = router;