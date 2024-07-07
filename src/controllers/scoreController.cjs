const Score = require("../models/scoreModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getScore = catchAsync(async (req, res, next) => {
    const score = await Score.findById(req.params.id);

    if (!score) {
        return next(new AppError("No score found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            score,
        },
    });
});

exports.getAllScores = catchAsync(async (req, res) => {
    const scores = await Score.find();

    res.status(200).json({
        status: "success",
        results: scores.length,
        data: {
            scores,
        },
    });
});

exports.updateScore = catchAsync(async (req, res, next) => {
    const score = await Score.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!score) {
        return next(new AppError("No score found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            score,
        },
    });
});

exports.addScore = catchAsync(async (req, res) => {
    const newScore = await Score.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            score: newScore,
        },
    });
});

exports.deleteScore = catchAsync(async (req, res, next) => {
    const score = await Score.findByIdAndDelete(req.params.id);

    if (!score) {
        return next(new AppError("No score found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
