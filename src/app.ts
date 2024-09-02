import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const responseCallback = (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "This is from the server" });
};

app.route("/").get(responseCallback);

const getAllUsers = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

const createUser = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

app.route("/users").get(getAllUsers).post(createUser);

const getUser = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

const updateUser = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

const deleteUser = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

app.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
