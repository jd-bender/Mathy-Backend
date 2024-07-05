import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Must include first name."],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Must include last name."],
            trim: true,
        },
        age: {
            type: Number,
        },
        email: {
            type: String,
            required: [true, "Must include email address."],
            trim: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});

const User = mongoose.model("User", userSchema);

export default User;
