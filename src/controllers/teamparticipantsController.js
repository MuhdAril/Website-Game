// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const model = require("../models/teamparticipantsModel");

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECKING IF PLAYER EXISTS
// #############################################################################################################################################
module.exports.checkUserId = (req, res, next) => {
    if (res.locals.user_id == undefined || req.body.team_id == undefined) {
        res.status(400).send("Error: user_id or team_id undefined");
        return;
    }

    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "user_id does not exist"
                });
            }
            else next();
        }
    }

    model.verifyUser(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECKING IF TEAM EXISTS
// #############################################################################################################################################
module.exports.checkTeamId = (req, res, next) => {
    const data = {
        team_id: req.body.team_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkTeamId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "team_id does not exist"
                });
            }
            else next();
        }
    }

    model.verifyTeam(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR RESTRICTING PLAYERS FROM BEING IN MORE THAN ONE TEAM
// #############################################################################################################################################
module.exports.blockUserDup = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error blockUserDup:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Each user can only join one team"
                });
            }
            else next();
        }
    }

    model.checkDup(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR CREATING A USER-TEAM JOINT
// #############################################################################################################################################
module.exports.insertSingleJoin = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        team_id: req.body.team_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error insertSingleJoin:", error);
            res.status(500).json(error);
        } else {
            const currentDate = new Date();

            const insertedJoin = {
                join_id: results.insertId,
                user_id: res.locals.user_id,
                team_id: req.body.team_id,
                join_date: currentDate.toISOString().split('T')[0]
            }

            res.status(201).json(insertedJoin);
        }
    }

    model.insertSingle(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION DELETING A USER-TEAM JOINT
// #############################################################################################################################################
module.exports.deleteJoinById = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteJoinById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User-team joint not found"
                });   
            } else next();
        }
    };

    model.deleteById(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR AUTO INCREMENTING TABLES
// #############################################################################################################################################
module.exports.autoIncrement = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error autoIncrement:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send();
        }
    }

    model.increment(callback);
}