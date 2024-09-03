import express from "express";
import morgan from "morgan";

import userRouter from "./routes/userRoutes.ts";
import moduleRouter from "./routes/moduleRoutes.ts";
import userModuleRouter from "./routes/userModuleRoutes.ts";

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.use("/users", userRouter);
app.use("/modules", moduleRouter);
app.use("/users/:userId/modules", userModuleRouter);

export default app;
