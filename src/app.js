import express, { json } from "express";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import scoreRouter from "./routes/scoreRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// adds request logging in dev console
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// adds body to request object
app.use(json());

app.use("/api/v1/scores", scoreRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`No server path for ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
