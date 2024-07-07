import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email."],
        },
        password: {
            type: String,
            required: [true, "Please enter a password."],
            minLength: 8,
            select: false,
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

userSchema.pre("save", async function (next) {
    if (!this.isModified(this.password)) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
