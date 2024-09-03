import UserModule from "../models/userModuleModel.ts";
import { Request, Response } from "express";

export const createUserModule = async (req: Request, res: Response) => {
    try {
        const newUserModule = await UserModule.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                userModule: newUserModule,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const getAllUserModules = async (req: Request, res: Response) => {
    try {
        const userModules = await UserModule.find();

        res.status(200).json({
            status: "success",
            results: userModules.length,
            data: {
                userModules,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const updateUserModule = async (req: Request, res: Response) => {
    try {
        const userModule = await UserModule.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        res.status(200).json({
            status: "success",
            data: {
                userModule,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const deleteUserModule = async (req: Request, res: Response) => {
    try {
        await UserModule.findByIdAndDelete(req.params.id);

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
