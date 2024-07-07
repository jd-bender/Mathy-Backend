import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

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

export { getUser, getAllUsers, updateUser, deleteUser, deleteAllUsers };
