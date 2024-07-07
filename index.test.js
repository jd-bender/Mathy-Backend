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

const endpointRoot = `http://localhost:${port}/api/v1`;

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
        afterEach(() => {
            return axios.delete(`${endpointRoot}/users`);
        });

        const testUser = {
            firstName: "Bill",
            lastName: "Billyson",
            age: 80,
            email: "bill@billyyy.com",
            password: "password",
        };

        test("Add user", () => {
            return axios
                .post(`${endpointRoot}/users/signup`, testUser)
                .then((creationResponse) => {
                    expect(creationResponse.data.data.user).toHaveProperty(
                        "_id",
                    );
                });
        });

        test("Get user", () => {
            return axios
                .post(`${endpointRoot}/users/signup`, testUser)
                .then((creationResponse) => {
                    expect(creationResponse.data.data.user).toHaveProperty(
                        "_id",
                    );

                    return axios
                        .get(
                            `${endpointRoot}/users/${creationResponse.data.data.user._id}`,
                        )
                        .then((getResponse) => {
                            expect(getResponse.data.status).toBe("success");
                            expect(getResponse.data.data.user).toHaveProperty(
                                "_id",
                            );
                        });
                });
        });

        test("Block user creation for duplicate email address", () => {
            return axios
                .post(`${endpointRoot}/users/signup`, testUser)
                .then(() => {
                    return axios
                        .post(`${endpointRoot}/users/signup`, testUser)
                        .catch((e) => {
                            expect(e.response.data.status).toBe("fail");
                        });
                });
        });

        test("Delete user", () => {
            return axios
                .post(`${endpointRoot}/users/signup`, testUser)
                .then((creationResponse) => {
                    expect(creationResponse.data.data.user).toHaveProperty(
                        "_id",
                    );

                    return axios
                        .delete(
                            `${endpointRoot}/users/${creationResponse.data.data.user._id}`,
                        )
                        .then((deletionResponse) => {
                            expect(deletionResponse.data.status).toBe(
                                "success",
                            );

                            return axios
                                .get(
                                    `${endpointRoot}/users/${creationResponse.data.data.user._id}`,
                                )
                                .catch((e) => {
                                    expect(e.response.data.status).toBe("fail");
                                });
                        });
                });
        });

        test("Update user", () => {
            return axios
                .post(`${endpointRoot}/users/signup`, testUser)
                .then((creationResponse) => {
                    expect(creationResponse.data.data.user).toHaveProperty(
                        "_id",
                    );

                    const newFirstName = "Notbilly";

                    return axios
                        .patch(
                            `${endpointRoot}/users/${creationResponse.data.data.user._id}`,
                            {
                                firstName: newFirstName,
                            },
                        )
                        .then((updateResponse) => {
                            expect(
                                updateResponse.data.data.user.firstName,
                            ).toBe(newFirstName);
                        });
                });
        });
    });
});
