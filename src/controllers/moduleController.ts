import { Request, Response, NextFunction } from "express";
import AppError from "../appError.ts";
import Module from "../models/moduleModel.ts";

export const createModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newModule = await Module.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                module: newModule,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return next(new AppError(e.message, 400));
        } else {
            return next(new AppError("Something went wrong.", 400));
        }
    }
};

export const getAllModules = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const modules = await Module.find();

        res.status(200).json({
            status: "success",
            results: modules.length,
            data: {
                modules,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return next(new AppError(e.message, 400));
        } else {
            return next(new AppError("Something went wrong.", 400));
        }
    }
};

const noModuleFound = (next: NextFunction) =>
    next(new AppError("No module found with that ID.", 404));

export const getModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const module = await Module.findById(req.params.id);

        if (!module) return noModuleFound(next);

        res.status(200).json({
            status: "success",
            data: {
                module,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return next(new AppError(e.message, 400));
        } else {
            return next(new AppError("Something went wrong.", 400));
        }
    }
};

export const updateModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!module) return noModuleFound(next);

        res.status(200).json({
            status: "success",
            data: {
                module,
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return next(new AppError(e.message, 400));
        } else {
            return next(new AppError("Something went wrong.", 400));
        }
    }
};

export const deleteModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);

        if (!module) return noModuleFound(next);

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return next(new AppError(e.message, 400));
        } else {
            return next(new AppError("Something went wrong.", 400));
        }
    }
};
