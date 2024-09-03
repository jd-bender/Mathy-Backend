import { Request, Response, NextFunction } from "express";
import catchAsync from "utilities/catchAsync.ts";
import AppError from "utilities/appError.ts";
import User from "../models/userModel.ts";

export const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    },
);

export const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    },
);

export const getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new AppError("No user found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    },
);

export const updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return next(new AppError("No user found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    },
);

export const deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(new AppError("No user found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: null,
        });
    },
);
