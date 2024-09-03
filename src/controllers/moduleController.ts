import Module from "../models/moduleModel.ts";
import { Request, Response } from "express";

export const createModule = async (req: Request, res: Response) => {
    try {
        const newModule = await Module.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                module: newModule,
            },
        });
    } catch (e) {
        res.status(201).json({
            status: "error",
            message: e,
        });
    }
};

export const getAllModules = (req: Request, res: Response) => {
    res.status(500).json({
        status: "error",
        message: "Route not yet created.",
    });
};
