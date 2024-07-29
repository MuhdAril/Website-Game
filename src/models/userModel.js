// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const pool = require('../services/db');

// #############################################################################################################################################
// DEFINE SELECT BY ID OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User`;

    pool.query(SQLSTATEMENT, callback);
};

// #############################################################################################################################################
// DEFINE SELECT BY ID OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user.user_id, user.username, user.email, COALESCE(COUNT(questprogress.quest_id), 0) AS level, COALESCE(team.name, 'No Team, join a team to complete quests.') AS Team, user.created_on
    FROM user
    LEFT JOIN teamparticipants ON user.user_id = teamparticipants.user_id
    LEFT JOIN team ON teamparticipants.team_id = team.team_id
    LEFT JOIN questprogress ON team.team_id = questprogress.team_id
    WHERE user.user_id = ?
    GROUP BY user.user_id, user.username, team.name;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE INSERT OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.insertUser = (data, callback) => {
    const SQLSTATEMENT = `INSERT INTO User (username, email, password) VALUES (?, ?, ?)`;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// #############################################################################################################################################
// DEFINE UPDATE OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.updateUser = (data, callback) => {
    const SQLSTATEMENT = `UPDATE User SET username = ?, email = ?, password = ? WHERE user_id = ?`;
    const VALUES = [data.username, data.email, data.password, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// #############################################################################################################################################
// DEFINE DELETE OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.deleteUser = (data, callback) => {
    const SQLSTATEMENT = `DELETE FROM User WHERE user_id = ?`;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// #############################################################################################################################################
// DEFINE SELECT BY USERNAME OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.selectUserByUsername = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM User WHERE username = ?`;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE SELECT BY USERNAME OR EMAIL OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.selectUserByUsernameOrEmail = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM User WHERE username = ? OR email = ?`;
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE SELECT BY USERNAME OR EMAIL OPERATIONS FOR USER EXCEPT OWN ID
// #############################################################################################################################################
module.exports.selectUserByUsernameOrEmailExceptId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM user WHERE username = ? OR email = ?
    EXCEPT
    SELECT * FROM user WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// #############################################################################################################################################
// DEFINE AUTO INCREMENT OPERATIONS FOR USER
// #############################################################################################################################################
module.exports.increment = (callback) => {
    const SQLSTATEMENT = `
    ALTER TABLE user AUTO_INCREMENT = 1;
    ALTER TABLE taskprogress AUTO_INCREMENT = 1;
    ALTER TABLE teamparticipants AUTO_INCREMENT = 1;
    `;

    pool.query(SQLSTATEMENT, callback);
}