import { Schema, model } from "mongoose";

const userModuleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must include a user ID."],
    },
    module: {
        type: Schema.Types.ObjectId,
        ref: "Module",
        required: [true, "Must include a module ID."],
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    highestStreak: {
        type: Number,
        required: false,
        default: 0,
    },
});

export default model("User_Module", userModuleSchema);
