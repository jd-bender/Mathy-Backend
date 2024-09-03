import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must include a name."],
    },
    slug: {
        type: String,
        required: [true, "Must include a slug."],
    },
});

export default mongoose.model("Module", moduleSchema);
