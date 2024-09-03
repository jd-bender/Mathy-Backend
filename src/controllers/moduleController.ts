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
        res.status(400).json({
            status: "error",
            message: e,
        });
    }
};

export const getAllModules = async (req: Request, res: Response) => {
    try {
        const modules = await Module.find();

        res.status(200).json({
            status: "success",
            results: modules.length,
            data: {
                modules,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const getModule = async (req: Request, res: Response) => {
    try {
        const module = await Module.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                module,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const updateModule = async (req: Request, res: Response) => {
    try {
        const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                module,
            },
        });
    } catch (e) {
        res.status(404).json({
            status: "error",
            message: e,
        });
    }
};

export const deleteModule = async (req: Request, res: Response) => {
    try {
        await Module.findByIdAndDelete(req.params.id);

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
