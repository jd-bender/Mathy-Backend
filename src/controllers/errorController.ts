import { Request, Response, NextFunction } from "express";

interface Error {
    statusCode?: number;
    message?: string;
}

export default (e: Error, req: Request, res: Response, next: NextFunction) => {
    e.statusCode = e.statusCode || 500;

    res.status(e.statusCode).json({
        status: "error",
        message: e.message,
    });
};
