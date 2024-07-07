const jwt = require("jsonwebtoken");
const User = require("../models/userModel.cjs");
const catchAsync = require("../utils/catchAsync.cjs");
const AppError = require("../utils/appError.cjs");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signUp = catchAsync(async (req, res, next) => {
    if ("role" in req.body) delete req.body.role;

    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });

    next();
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new AppError("Please provide both email and password.", 400),
        );
    }

    const user = User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password.", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token,
    });
});
