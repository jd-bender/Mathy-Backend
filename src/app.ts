import express from "express";
import morgan from "morgan";

import userRouter from "./routes/userRoutes.ts";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouter);

export default app;
