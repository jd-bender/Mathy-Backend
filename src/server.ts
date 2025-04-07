import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
    const DB = process.env.DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD,
    );

    mongoose
        .connect(DB)
        .then(() => {
            console.log("Connected to database successfully.");
        })
        .catch((e) => {
            console.log("Did not connect to database.");
            console.log(e);
        });
}

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
