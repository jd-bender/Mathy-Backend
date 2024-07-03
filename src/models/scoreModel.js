import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: [true, "A score must have a value."],
    },
});

const Score = mongoose.model("Score", scoreSchema);

export default Score;
