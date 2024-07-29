// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const pool = require('../services/db');

// #############################################################################################################################################
// DEFINE VERIFY PLAYER EXISTENCE OPERATIONS FOR TEAMPARTICIPANTS
// #############################################################################################################################################
module.exports.verifyUser = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE VERIFY TEAM EXISTENCE OPERATIONS FOR TEAMPARTICIPANTS
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
// DEFINE CHECK PLAYER DUPLICATES OPERATIONS FOR TEAMPARTICIPANTS
// #############################################################################################################################################
module.exports.checkDup = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM teamparticipants WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE INSERT OPERATIONS FOR TEAMPARTICIPANTS
// #############################################################################################################################################
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO teamparticipants (join_id, user_id, team_id, join_date)
    VALUES (?, ?, ?, CURRENT_DATE);
    `;
    const VALUES = [data.join_id, data.user_id, data.team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE DELETE OPERATIONS FOR TEAMPARTICIPANTS
// #############################################################################################################################################
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM teamparticipants
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE AUTO INCREMENT OPERATIONS FOR TEAMPARTICIPANTS
// #############################################################################################################################################
module.exports.increment = (callback) => {
    const SQLSTATMENT = `
    ALTER TABLE teamparticipants AUTO_INCREMENT = 1;
    `;

    pool.query(SQLSTATMENT, callback);
}