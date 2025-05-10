import { Router } from "express";
import {
    createModule,
    getAllModules,
    getModule,
    updateModule,
    deleteModule,
} from "../controllers/moduleController.ts";

const router = Router();

router.route("/").post(createModule).get(getAllModules);
router.route("/:id").get(getModule).patch(updateModule).delete(deleteModule);

export default router;
