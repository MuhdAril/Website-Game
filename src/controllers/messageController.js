const model = require("../models/messageModel.js");

module.exports.insertSingleMessage = (req, res, next) => {

    console.log(res.locals.user_id);
    if (res.locals.user_id == undefined) {
        res.status(400).send("Error: Login to send a message");
        return;
    }
    const data = {
        user_id: res.locals.user_id,
        message_text: req.body.message_text
    }

    console.log(data);

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}

module.exports.readMessageById = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

module.exports.readAllMessageWithToken = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllWithToken(data, callback);
}

module.exports.updateMessageById = (req, res, next) => {
    if (req.params.message_id == undefined) {
        res.status(400).send("Error: message_id is undefined");
        return;
    }

    const data = {
        message_id: req.params.message_id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateById(data, callback);
}

module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteById(data, callback);
}