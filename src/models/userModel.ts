import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    },
    password: {
        type: String,
        required: [true, "Must include password."],
    },
});

export default mongoose.model("User", userSchema);
