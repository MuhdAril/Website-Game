// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const express = require('express');
const router = express.Router();

// #############################################################################################################################################
// CREATE ROUTER & DEFINE ROUTES
// #############################################################################################################################################

const userRoutes = require('./userRoutes');

const teamRoutes = require('./teamRoutes');
const teamparticipantsRoutes = require('./teamparticipantsRoutes');
const questRoutes = require('./questRoutes');
const questprogressRoutes = require('./questprogressRoutes');
const rankingsRoutes = require('./rankingsRoutes')
const messageRoutes = require('./messageRoutes')

const userController = require('../controllers/userController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');

// #############################################################################################################################################
// DEFINE ROUTES
// #############################################################################################################################################

router.use("/users", userRoutes);

router.use("/teams", teamRoutes);
router.use("/teamparticipants", teamparticipantsRoutes);
router.use("/quests", questRoutes);
router.use("/questprogress", questprogressRoutes);
router.use("/rankings", rankingsRoutes);
router.use("/messages", messageRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

// #############################################################################################################################################
// EXPORT ROUTER
// #############################################################################################################################################
module.exports = router;