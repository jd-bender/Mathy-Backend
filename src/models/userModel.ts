import { Schema, model } from "mongoose";
import validator from "validator";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const userSchema = new Schema<IUser>({
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
        validate: [validator.isEmail, "Must be a valid email format."],
    },
    password: {
        type: String,
        required: [true, "Must include password."],
        minlength: 8,
    },
});

export default model("User", userSchema);
