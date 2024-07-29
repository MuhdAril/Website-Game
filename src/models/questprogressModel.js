// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const pool = require('../services/db');

// #############################################################################################################################################
// DEFINE SELECT BY TOKEN OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.selectByToken = (data, callback) => {
    const SQLSTATMENT = `
    SELECT team.team_id
    FROM team
    LEFT JOIN teamparticipants ON team.team_id = teamparticipants.team_id
    LEFT JOIN user ON teamparticipants.user_id = user.user_id
    WHERE user.user_id = ?
    GROUP BY team.team_id;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE VERIFY TEAM EXISTENCE OPERATIONS FOR QUESTPROGRESS
// #############################################################################################################################################
module.exports.verifyTeam = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM team
    WHERE team_id = ?;
    `;
    const VALUES = [data.team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE VERIFY QUEST EXISTENCE OPERATIONS FOR QUESTPROGRESS
// #############################################################################################################################################
module.exports.verifyQuest = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE INSERT OPERATIONS FOR QUESTPROGRESS
// #############################################################################################################################################
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO questprogress (progress_id, team_id, quest_id, completion_date)
    VALUES (?, ?, ?, CURRENT_DATE);
    `;
    const VALUES = [data.progress_id, data.team_id, data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE UPDATE RANK OPERATIONS FOR INDIVIDUAL TEAMS
// #############################################################################################################################################
module.exports.updateRank = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE team
    SET ranking = (
        SELECT ranking
        FROM rankings
        WHERE (
            SELECT SUM(quest.points)
            FROM questprogress
            JOIN quest ON questprogress.quest_id = quest.quest_id
            WHERE questprogress.team_id = team.team_id
        ) >= min_points
        ORDER BY min_points DESC
        LIMIT 1
    )
    WHERE team_id = ?;
    `;
    const VALUES = [data.team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}