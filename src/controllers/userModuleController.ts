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

export const getAllUserModules = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};
