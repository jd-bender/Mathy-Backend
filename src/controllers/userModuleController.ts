import { Request, Response, NextFunction } from "express";
import AppError from "../appError.ts";
import { handleError } from "utils.ts";
import UserModule from "../models/userModuleModel.ts";

export const createUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newUserModule = await UserModule.create({
            user: req.params.userId,
            module: req.params.moduleId,
            ...req.body,
        });

        res.status(201).json({
            status: "success",
            data: {
                userModule: newUserModule,
            },
        });
    } catch (e: unknown) {
        return handleError(next, e);
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
    } catch (e: unknown) {
        return handleError(next, e);
    }
};

const noUserModuleFound = (next: NextFunction) =>
    next(new AppError("No user module found with that ID.", 404));

export const getUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userModule = await UserModule.findById(req.params.id);

        if (!userModule) return noUserModuleFound(next);

        res.status(200).json({
            status: "success",
            data: {
                userModule,
            },
        });
    } catch (e: unknown) {
        return handleError(next, e);
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

        if (!userModule) return noUserModuleFound(next);

        res.status(200).json({
            status: "success",
            data: {
                userModule,
            },
        });
    } catch (e: unknown) {
        return handleError(next, e);
    }
};

export const deleteUserModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userModule = await UserModule.findByIdAndDelete(req.params.id);

        if (!userModule) return noUserModuleFound(next);

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (e: unknown) {
        return handleError(next, e);
    }
};
