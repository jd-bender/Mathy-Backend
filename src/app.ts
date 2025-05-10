import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import AppError from "./utilities/appError.ts";
import globalErrorHandler from "./controllers/errorController.ts";

import userRouter from "./routers/userRouter.ts";
import moduleRouter from "./routers/moduleRouter.ts";
import userModuleRouter from "./routers/userModuleRouter.ts";

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.use("/users", userRouter);
app.use("/modules", moduleRouter);
app.use("/users/:userId/modules", userModuleRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
        new AppError(
            `${req.originalUrl} is not available on this server.`,
            404,
        ),
    );
});

app.use(globalErrorHandler);

export default app;
