const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const scoreRouter = require("./routes/scoreRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// adds request logging in dev console
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// adds body to request object
app.use(express.json());

app.use("/api/v1/scores", scoreRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`No server path for ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
