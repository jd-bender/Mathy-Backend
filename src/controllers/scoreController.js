import Score from "../models/scoreModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const getScore = catchAsync(async (req, res, next) => {
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

const getAllScores = catchAsync(async (req, res) => {
    const scores = await Score.find();

    res.status(200).json({
        status: "success",
        results: scores.length,
        data: {
            scores,
        },
    });
});

const updateScore = catchAsync(async (req, res, next) => {
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

const addScore = catchAsync(async (req, res) => {
    const newScore = await Score.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            score: newScore,
        },
    });
});

const deleteScore = catchAsync(async (req, res, next) => {
    const score = await Score.findByIdAndDelete(req.params.id);

    if (!score) {
        return next(new AppError("No score found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export { getScore, getAllScores, updateScore, addScore, deleteScore };
