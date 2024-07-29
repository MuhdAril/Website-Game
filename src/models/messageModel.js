const pool = require('../services/db');

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT messages.message_text, messages.created_at, user.username FROM messages
    LEFT JOIN user
    ON Messages.user_id = user.user_id
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectAllWithToken = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM messages
    WHERE messages.user_id = ?
    `;
    const VALUES = [data.user_id]
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Messages
    LEFT JOIN user
    ON Messages.user_id = user.user_id
    WHERE messages.user_id = ?;
    `;
    const VALUES = [data.message_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO messages (message_text, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ? WHERE message_id = ?;
    `;
    const VALUES = [data.message_text, data.message_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE message_id = ?;
    `;
    const VALUES = [data.message_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}