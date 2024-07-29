// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const model = require("../models/teamModel");

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL TEAM
// #############################################################################################################################################
module.exports.readAllTeam = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTeam:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ TEAM BY ID
// #############################################################################################################################################
module.exports.readTeamById = (req, res, next) => {
    const data = {
        team_id: req.params.team_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTeamById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Team not found"
                });
            }
            else {
                const response = {
                    team_id: results[0].team_id,
                    team_name: results[0].team_name,
                    ranking: results[0].ranking,
                    total_points: parseInt(results[0].total_points || 0), //total_points will be 0 if team has not completed quests
                    members: results[0].members
                }
                res.status(200).json(response);
            }
        }
    }

    model.selectById(data, callback);
}

module.exports.readTeamByUser = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTeamById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User is not in a team"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectByUser(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ TEAM BY TOKEN
// #############################################################################################################################################
module.exports.readTeamByToken = (req, res, next) => {
    if (res.locals.user_id == undefined) {
        res.status(400).send("Error: user_id or team_id is undefined");
        return;
    }

    const data = {
        user_id: res.locals.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTeamByToken:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "You are not in a team. Join one to complete quests",
                });
            } else res.status(200).json(results[0]);
        }
    };

    model.selectByToken(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECKING NAME DUPLICATION BEFORE CREATE OR UPDATE
// #############################################################################################################################################
module.exports.checkNameDup = (req, res, next) => {
    if (req.body.name == undefined || req.body.name == "") {
        res.status(400).send("Error: Team name is undefined");
        return;
    }

    const data = {
        team_id: req.params.team_id,
        name: req.body.name
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkNameDup:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "This name is associated with another team"
                });
            }
            else next();
        }
    }

    model.checkName(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR CREATING A TEAM
// #############################################################################################################################################
module.exports.insertSingleTeam = (req, res, next) => {
    const data = {
        team_id: req.params.team_id,
        name: req.body.name,
        ranking: req.body.ranking
    }

    const callback = (error, results, fields) => {
        
        if (error) {
            console.error("Error createNewTeam:", error);
            res.status(500).json(error);
        } else {

            const insertedTeam = {
                team_id: results.insertId,
                name: req.body.name,
                ranking: 'unranked'
            }

            res.status(201).json(insertedTeam);
        }
    }

    model.insertSingle(data, callback);
}

