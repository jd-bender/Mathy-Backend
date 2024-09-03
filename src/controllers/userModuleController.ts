import { Request, Response, NextFunction } from "express";
import catchAsync from "utilities/catchAsync.ts";
import AppError from "utilities/appError.ts";
import UserModule from "../models/userModuleModel.ts";

export const createUserModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUserModule = await UserModule.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                userModule: newUserModule,
            },
        });
    },
);

export const getAllUserModules = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userModules = await UserModule.find();

        res.status(200).json({
            status: "success",
            results: userModules.length,
            data: {
                userModules,
            },
        });
    },
);

export const getUserModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
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
    },
);

export const updateUserModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
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
    },
);

export const deleteUserModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
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
    },
);
