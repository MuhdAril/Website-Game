// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const express = require('express');
const router = express.Router();

// #############################################################################################################################################
// CREATE ROUTER
// #############################################################################################################################################
const controller = require('../controllers/userController');

const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");


// #############################################################################################################################################
// DEFINE ROUTES
// #############################################################################################################################################
router.get('/', controller.readAllUser);

router.get('/:user_id', controller.readUserById);
router.get('/token/user', jwtMiddleware.verifyToken, controller.readUserByToken);

router.put('/:user_id', bcryptMiddleware.hashPassword, controller.checkUsernameOrEmailExistExceptId, controller.updateUserById);
router.delete('/:user_id', controller.deleteUserById, controller.autoIncrement, jwtMiddleware.verifyToken);

// #############################################################################################################################################
// EXPORT ROUTER
// #############################################################################################################################################
module.exports = router;