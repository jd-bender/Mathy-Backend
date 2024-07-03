import express, { json } from "express";
import morgan from "morgan";

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

export default app;
