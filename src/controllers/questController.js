// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const model = require("../models/questModel");

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL QUESTS
// #############################################################################################################################################
module.exports.readAllQuest = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuest:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ QUEST BY ID
// #############################################################################################################################################
module.exports.readQuestById = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}