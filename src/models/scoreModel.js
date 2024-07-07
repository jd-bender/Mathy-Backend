const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: [true, "A score must have a value."],
    },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
