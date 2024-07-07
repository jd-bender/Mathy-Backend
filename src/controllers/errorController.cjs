const AppError = require("../utils/appError.cjs");

const handleDBCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDBDuplicateFieldsError = (err) => {
    const message = `Duplicate field value(s): ${Object.keys(err.keyValue)}. Please use unique values.`;
    return new AppError(message, 423);
};

const handleDBValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong.",
        });
    }
};

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = Object.create(err);

        if (error.name === "CastError") {
            error = handleDBCastError(error);
        } else if (error.code === 11000) {
            error = handleDBDuplicateFieldsError(error);
        } else if (error.name === "ValidationError") {
            error = handleDBValidationError(error);
        }

        sendErrorProd(error, res);
    }
};

module.exports = globalErrorHandler;
