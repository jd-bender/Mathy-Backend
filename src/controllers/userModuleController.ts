import { Request, Response, NextFunction } from "express";
import AppError from "utilities/appError.ts";
import UserModule from "../models/userModuleModel.ts";

export const createUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newUserModule = await UserModule.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                userModule: newUserModule,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const getAllUserModules = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userModules = await UserModule.find();

        res.status(200).json({
            status: "success",
            results: userModules.length,
            data: {
                userModules,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const getUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userModule = await UserModule.findById(req.params.id);

        if (!userModule) {
            return next(
                new AppError("No user module found with that ID.", 404),
            );
        }

        res.status(200).json({
            status: "success",
            data: {
                userModule,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const updateUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userModule = await UserModule.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!userModule) {
            return next(
                new AppError("No user module found with that ID.", 404),
            );
        }

        res.status(200).json({
            status: "success",
            data: {
                userModule,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const deleteUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userModule = await UserModule.findByIdAndDelete(req.params.id);

        if (!userModule) {
            return next(
                new AppError("No user module found with that ID.", 404),
            );
        }

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};
