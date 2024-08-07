// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const pool = require('../services/db');

// #############################################################################################################################################
// DEFINE SELECT ALL OPERATIONS FOR RANKINGS
// #############################################################################################################################################
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM rankings;
    `;

    pool.query(SQLSTATMENT, callback);
}