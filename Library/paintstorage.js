const mongoose = require("mongoose");

const Storage = mongoose.Schema({
    userID: String,
    paint: Number,
    serverID: String,
});

module.exports = mongoose.model("Storage", Storage);