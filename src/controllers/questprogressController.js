// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const model = require("../models/questprogressModel");

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR READ TEAM BY TOKEN
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
            } else {
                res.locals.team_id = results[0].team_id;
                next();
            }
        }
    };

    model.selectByToken(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECKING IF TEAM EXISTS
// #############################################################################################################################################
module.exports.checkTeamId = (req, res, next) => {
    if (res.locals.team_id == undefined) {
        res.status(400).send("Error: team_id is undefined");
        return;
    }

    const data = {
        team_id: res.locals.team_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkTeamId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Team Id does not exist"
                });
            }
            else next();
        }
    }

    model.verifyTeam(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECKING IF QUEST EXISTS
// #############################################################################################################################################
module.exports.checkQuestId = (req, res, next) => {
    if (req.body.quest_id == undefined) {
        res.status(400).send("Error: quest_id is undefined");
        return;
    }
    const data = {
        quest_id: req.body.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkQuestId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest Id does not exist"
                });
            }
            else next();
        }
    }

    model.verifyQuest(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR CREATING A QUEST PROGRESS
// #############################################################################################################################################
module.exports.insertSingleProgress = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id,
        team_id: res.locals.team_id,
        quest_id: req.body.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewProgress:", error);
            res.status(500).json(error);
        } else {
            const currentDate = new Date();

            const insertedQuestProgress = {
                progress_id: results.insertId,
                team_id: req.body.team_id,
                quest_id: req.body.quest_id,
                completion_date: currentDate.toISOString().split('T')[0]
            }

            res.status(201).json(insertedQuestProgress);
            next();
        }
    }

    model.insertSingle(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR UPDATING A TEAM'S RANK
// #############################################################################################################################################
module.exports.updateTeamRank = (req, res, next) => {
    const data = {
        team_id: res.locals.team_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTeamRank:", error);
            res.status(500).json(error);
        }
    }

    model.updateRank(data, callback);
}