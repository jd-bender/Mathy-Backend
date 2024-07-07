import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

const updateUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

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

const deleteUser = catchAsync(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success",
        data: null,
    });
});

const deleteAllUsers = catchAsync(async (req, res) => {
    await User.deleteMany({});

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export {
    getUser,
    getAllUsers,
    updateUser,
    signUp,
    login,
    deleteUser,
    deleteAllUsers,
};
