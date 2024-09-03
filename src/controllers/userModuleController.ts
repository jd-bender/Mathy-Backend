import UserModule from "../models/userModuleModel.ts";
import { Request, Response } from "express";

export const getAllUserModules = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};
