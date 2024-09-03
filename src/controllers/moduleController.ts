import Module from "../models/moduleModel.ts";
import { Request, Response } from "express";

export const getAllModules = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};
