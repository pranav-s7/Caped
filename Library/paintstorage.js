const mongoose = require("mongoose");

const Storage = mongoose.Schema({
    userID: String,
    paint: Number,
});

module.exports = mongoose.model("Storage", Storage);