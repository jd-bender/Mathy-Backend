import { Schema, model } from "mongoose";
import slugify from "../imports/slugify.ts";

const moduleSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Must include a name."],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    },
);

moduleSchema.virtual("slug").get(function () {
    return slugify(this.name, { lower: true });
});

export default model("Module", moduleSchema);
