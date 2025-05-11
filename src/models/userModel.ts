import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Must include first name."],
    },
    lastName: {
        type: String,
        required: [true, "Must include last name."],
    },
    email: {
        type: String,
        required: [true, "Must include email."],
        unique: true,
        validate: [validator.isEmail],
    },
    password: {
        type: String,
        required: [true, "Must include password."],
    },
});

export default model("User", userSchema);
