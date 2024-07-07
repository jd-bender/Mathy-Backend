import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("Uncaught exception, shutting down.");

    process.exit(1);
});

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
    console.log("DB connection successful.");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled rejection, shutting down.");

    server.close(() => {
        process.exit(1);
    });
});
