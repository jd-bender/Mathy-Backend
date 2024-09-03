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

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};
