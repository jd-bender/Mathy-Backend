import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signUp = catchAsync(async (req, res) => {
    if ("role" in req.body) delete req.body.role;

    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(200).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});

const login = catchAsync(async (req, res, next) => {
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

export { signUp, login };
