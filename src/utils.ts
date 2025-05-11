import { NextFunction } from "express";
import AppError from "appError.ts";

export const handleError = (next: NextFunction, error: unknown) => {
    if (error instanceof Error) {
        return next(new AppError(error.message, 400));
    } else {
        return next(new AppError("Something went wrong.", 400));
    }
};
