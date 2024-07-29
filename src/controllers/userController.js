// #############################################################################################################################################
// REQUIRE MODULES
// #############################################################################################################################################
const model = require("../models/userModel.js");

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL USER
// #############################################################################################################################################
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ USER BY ID
// #############################################################################################################################################
module.exports.readUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                const response = {
                    user_id: results[0].user_id,
                    username: results[0].username,
                    email: results[0].email,
                    level: parseInt(results[0].level || 0), //level will be 0 if not in a team or team has not completed quests
                    team: results[0].Team,
                    created_on: results[0].created_on
                }
                res.status(200).json(response);
            }
        }
    }

    model.selectById(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR READ USER BY TOKEN
// #############################################################################################################################################
module.exports.readUserByToken = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                const response = {
                    user_id: results[0].user_id,
                    username: results[0].username,
                    email: results[0].email,
                    level: parseInt(results[0].level || 0), //level will be 0 if not in a team or team has not completed quests
                    team: results[0].Team,
                    created_on: results[0].created_on
                }
                res.status(200).json(response);
            }
        }
    }

    model.selectById(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECK USERNAME OR EMAIL DUPLICATION BEFORE CREATE OR UPDATE
// #############################################################################################################################################
module.exports.checkUsernameOrEmailExist = (req, res, next) => {

    const data = {
        username: req.body.username,
        email: req.body.email,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists",
                });
            } else next();
        }
    };

    model.selectUserByUsernameOrEmail(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR CHECK USERNAME OR EMAIL EXCEPT OWN ID DUPLICATION BEFORE CREATE OR UPDATE
// #############################################################################################################################################
module.exports.checkUsernameOrEmailExistExceptId = (req, res, next) => {

    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists",
                });
            } else next();
        }
    };

    model.selectUserByUsernameOrEmailExceptId(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR REGISTERING A USER
// #############################################################################################################################################
module.exports.register = (req, res, next) => {
    if (
        req.body.username == undefined ||
        req.body.email == undefined ||
        req.body.password == undefined
    ) {
        res.status(400).send("Error: username is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.user_id = results.insertId;
            res.locals.message = "User " + req.body.username + " created successfully.";
            next();
        }
    };

    model.insertUser(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR LOGIN
// #############################################################################################################################################
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: "Error: username or password is undefined",
        });
        return;
    }

    const data = {
        username: req.body.username
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found",
                });
            } else {
                res.locals.user_id = results[0].user_id;
                res.locals.username = results[0].username;
                res.locals.hash = results[0].password;
                res.locals.message = "User " + res.locals.username + " logged in successfully.";
                next();
            }
        }
    };

    model.selectUserByUsername(data, callback);
};

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATING A USER
// #############################################################################################################################################
module.exports.updateUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else res.status(200).json(data);
        }
    }

    model.updateUser(data, callback);
}

// #############################################################################################################################################
// DEFINE CONTROLLER FUNCTION FOR DELETING A USER
// #############################################################################################################################################
module.exports.deleteUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else next();
        }
    }

    model.deleteUser(data, callback);
}

// #############################################################################################################################################
// DEFINE MIDDLEWARE CONTROLLER FUNCTION FOR AUTO INCREMENTING TABLES
// #############################################################################################################################################
module.exports.autoIncrement = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error autoIncrement:", error);
            res.status(500).json(error);
        } else res.status(204).send();
    }

    model.increment(callback);
}
