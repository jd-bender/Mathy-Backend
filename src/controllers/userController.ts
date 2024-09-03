import User from "../models/userModel.ts";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const getUser = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

export const updateUser = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};

export const deleteUser = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};
