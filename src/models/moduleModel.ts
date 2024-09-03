import mongoose from "mongoose";
import slugify from "../imports/slugify.ts";

const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must include a name."],
    },
    slug: String,
});

moduleSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

export default mongoose.model("Module", moduleSchema);
