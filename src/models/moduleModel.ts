import { Schema, model } from "mongoose";

const moduleSchema = new Schema({
    name: {
        type: String,
        required: [true, "Must include a name."],
    },
});

export default model("Module", moduleSchema);
