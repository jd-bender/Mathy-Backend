const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError.cjs");
const globalErrorHandler = require("./controllers/errorController.cjs");
const scoreRouter = require("./routes/scoreRoutes.cjs");
const userRouter = require("./routes/userRoutes.cjs");

const app = express();

// adds request logging in dev console
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// adds body to request object
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/scores", scoreRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`No server path for ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
