const User = require("../models/userModel.cjs");
const catchAsync = require("../utils/catchAsync.cjs");
const AppError = require("../utils/appError.cjs");

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: null,
    });
});

exports.deleteAllUsers = catchAsync(async (req, res) => {
    await User.deleteMany({});

    res.status(200).json({
        status: "success",
        data: null,
    });
});
