// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const express = require('express');
const router = express.Router();

// #############################################################################################################################################
// CREATE ROUTER
// #############################################################################################################################################
const controller = require('../controllers/messageController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// #############################################################################################################################################
// DEFINE ROUTES
// #############################################################################################################################################
router.get('/', controller.readAllMessage);
router.get('/token/message', jwtMiddleware.verifyToken, controller.readAllMessageWithToken);
router.post('/', jwtMiddleware.verifyToken, controller.insertSingleMessage);
router.get('/:message_id', controller.readMessageById);
router.put('/:message_id', controller.updateMessageById);
router.delete('/:message_id', controller.deleteMessageById);

// #############################################################################################################################################
// EXPORT ROUTER
// #############################################################################################################################################
module.exports = router;