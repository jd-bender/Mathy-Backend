const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const app = require("./src/app.cjs");

process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("Uncaught exception, shutting down.");

    process.exit(1);
});

dotenv.config({ path: "./.env" });

process.env.NODE_ENV = "production";

const DB = process.env.TEST_DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD,
);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

describe("Mathy Endpoints", () => {
    beforeAll(async () => {
        await mongoose.connect(DB);

        process.on("unhandledRejection", (err) => {
            console.log(err.name, err.message);
            console.log("Unhandled rejection, shutting down.");

            server.close(() => {
                process.exit(1);
            });
        });
    });

    afterAll(() => {
        mongoose.disconnect();
        server.close();
    });

    describe("User Routes", () => {
        test("Add User", () => {
            return axios
                .post(`http://localhost:${port}/api/v1/users/signup`, {
                    firstName: "Bill",
                    lastName: "Billyson",
                    age: 80,
                    email: "bill@billyyy.com",
                    password: "password",
                })
                .then((response) => {
                    expect(response.data.data.user).toHaveProperty("_id");
                });
        });

        test("Block user creation for duplicate email address", () => {
            return axios
                .post(`http://localhost:${port}/api/v1/users/signup`, {
                    firstName: "Bill",
                    lastName: "Billyson",
                    age: 80,
                    email: "bill@billyyy.com",
                    password: "password",
                })
                .catch((e) => {
                    expect(e.response.data.status).toEqual("fail");
                });
        });
    });
});
