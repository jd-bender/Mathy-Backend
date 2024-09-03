import { Request, Response, NextFunction } from "express";
import catchAsync from "utilities/catchAsync.ts";
import AppError from "utilities/appError.ts";
import Module from "../models/moduleModel.ts";

export const createModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newModule = await Module.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                module: newModule,
            },
        });
    },
);

export const getAllModules = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const modules = await Module.find();

        res.status(200).json({
            status: "success",
            results: modules.length,
            data: {
                modules,
            },
        });
    },
);

export const getModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const module = await Module.findById(req.params.id);

        if (!module) {
            return next(new AppError("No module found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                module,
            },
        });
    },
);

export const updateModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!module) {
            return next(new AppError("No module found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                module,
            },
        });
    },
);

export const deleteModule = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const module = await Module.findByIdAndDelete(req.params.id);

        if (!module) {
            return next(new AppError("No module found with that ID.", 404));
        }

        res.status(200).json({
            status: "success",
            data: null,
        });
    },
);
