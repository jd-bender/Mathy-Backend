const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.cjs");
const catchAsync = require("../utils/catchAsync.cjs");
const AppError = require("../utils/appError.cjs");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// eslint-disable-next-line no-unused-vars
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

exports.protect = catchAsync(async (req, res, next) => {
    let token = null;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError("Not logged in, please log in to continue.", 401),
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
        return next(
            new AppError(
                "The user associated with this token no longer exists.",
                401,
            ),
        );
    }

    // if (user.changedPasswordAfterTokenIssued(decoded.iat)) {
    //     return next(new AppError('Password was recently changed, please log in again.', 401));
    // }

    req.user = user;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action.",
                    403,
                ),
            );
        }

        next();
    };
};
