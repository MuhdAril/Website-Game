// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const express = require('express');
const router = express.Router();

// #############################################################################################################################################
// CREATE ROUTER
// #############################################################################################################################################
const controller = require('../controllers/teamController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// #############################################################################################################################################
// DEFINE ROUTES
// #############################################################################################################################################
router.get('/', controller.readAllTeam);
router.post('/', controller.checkNameDup, controller.insertSingleTeam);
router.get('/:team_id', controller.readTeamById);
router.get('/:user_id', controller.readTeamByUser);
router.get("/token/team", jwtMiddleware.verifyToken, controller.readTeamByToken);

// #############################################################################################################################################
// EXPORT ROUTER
// #############################################################################################################################################
module.exports = router;