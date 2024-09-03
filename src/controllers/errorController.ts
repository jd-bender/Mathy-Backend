import { Request, Response, NextFunction } from "express";

interface Error {
    statusCode: number;
    status?: string;
    message?: string;
    stack?: Array<string>;
}

const sendErrorDev = (e: Error, res: Response) => {
    res.status(e.statusCode).json({
        status: e.status,
        error: e,
        message: e.message,
        stack: e.stack,
    });
};

const sendErrorProd = (e: Error, res: Response) => {
    res.status(e.statusCode).json({
        status: e.status,
        message: e.message,
    });
};

export default (e: Error, req: Request, res: Response, next: NextFunction) => {
    e.statusCode = e.statusCode || 500;
    e.status = e.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(e, res);
    } else if (process.env.NODE_ENV === "production") {
        sendErrorProd(e, res);
    }
};
