import { Request, Response, NextFunction } from "express";
import AppError from "../utilities/appError.js";
import User from "../models/userModel.js";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (e: any) {
        return next(new AppError(e.message, 400));
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (e: any) {
        return next(new AppError(e.message, 400));
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
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
    } catch (e: any) {
        return next(new AppError(e.message, 400));
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
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
    } catch (e: any) {
        return next(new AppError(e.message, 400));
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(new AppError("No user found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (e) {
        return next(new AppError(e.message, 400));
    }
};
