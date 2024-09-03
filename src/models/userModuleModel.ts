import mongoose from "mongoose";

const userModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must include a name."],
    },
    slug: {
        type: String,
        required: [true, "Must include a slug."],
    },
});

export default mongoose.model("User_Module", userModuleSchema);
