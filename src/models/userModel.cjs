const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
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
        passwordChangedAt: Date,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
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

userSchema.methods.changedPasswordAfterTokenIssed = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
        );

        console.log(changedTimestamp, JWTTimestamp);

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

const User = model("User", userSchema);

module.exports = User;
