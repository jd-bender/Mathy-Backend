import { Request, Response, NextFunction } from "express";
import AppError from "../appError.ts";
import { handleError } from "utils.ts";
import User from "../models/userModel.ts";

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
    } catch (e: unknown) {
        return handleError(next, e);
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
    } catch (e: unknown) {
        return handleError(next, e);
    }
};

const noUserFound = (next: NextFunction) =>
    next(new AppError("No user found with that ID.", 404));

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return noUserFound(next);

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (e: unknown) {
        return handleError(next, e);
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

        if (!user) return noUserFound(next);

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (e: unknown) {
        return handleError(next, e);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return noUserFound(next);

        res.status(200).json({
            status: "succcess",
            data: null,
        });
    } catch (e: unknown) {
        return handleError(next, e);
    }
};
