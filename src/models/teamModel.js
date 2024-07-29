// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const pool = require('../services/db');

// #############################################################################################################################################
// DEFINE SELECT ALL OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM team;
    `;

    pool.query(SQLSTATMENT, callback);
}

// #############################################################################################################################################
// DEFINE SELECT BY ID OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT team.team_id, team.name AS team_name, team.ranking,
    COALESCE((
        SELECT SUM(quest.points)
        FROM questprogress
        JOIN quest ON questprogress.quest_id = quest.quest_id
        WHERE questprogress.team_id = team.team_id
    ), 0) AS total_points,
    COALESCE((GROUP_CONCAT(DISTINCT user.username ORDER BY user.user_id)), 'There are no members in this team') AS members
    FROM team
    LEFT JOIN teamparticipants ON team.team_id = teamparticipants.team_id
    LEFT JOIN user ON teamparticipants.user_id = user.user_id
    WHERE team.team_id = ?
    GROUP BY team.team_id;
    `;
    const VALUES = [data.team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE SELECT BY USER OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.selectByUser = (data, callback) => {
    const SQLSTATMENT = `
    SELECT team.team_id, team.name AS team_name, team.ranking,
    COALESCE((
        SELECT SUM(quest.points)
        FROM questprogress
        JOIN quest ON questprogress.quest_id = quest.quest_id
        WHERE questprogress.team_id = team.team_id
    ), 0) AS total_points,
    COALESCE((GROUP_CONCAT(DISTINCT user.username ORDER BY user.user_id)), 'There are no members in this team') AS members
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
// DEFINE SELECT BY TOKEN OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.selectByToken = (data, callback) => {
    const SQLSTATMENT = `
    SELECT team.team_id, team.name AS team_name, team.ranking,
    COALESCE((
        SELECT SUM(quest.points)
        FROM questprogress
        JOIN quest ON questprogress.quest_id = quest.quest_id
        WHERE questprogress.team_id = team.team_id
    ), 0) AS total_points,
    COALESCE((GROUP_CONCAT(DISTINCT user.username ORDER BY user.user_id)), 'There are no members in this team') AS members
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
// DEFINE CHECK NAME DUPLICATES OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.checkName = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM team WHERE name = ?
    EXCEPT
    SELECT * FROM team WHERE team_id = ?;
    `;
    const VALUES = [data.name, data.team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE INSERT OPERATIONS FOR TEAM
// #############################################################################################################################################
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO team (team_id, name, ranking)
    VALUES (?, ?, 'unranked');
    `;
    const VALUES = [data.team_id, data.name, data.ranking];

    pool.query(SQLSTATMENT, VALUES, callback);
}