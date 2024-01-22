import { Router } from "express";
import { getApiChannel } from "../../../network/controllers/category.controller";

const router: Router = Router();

router.get("/", getApiChannel);

export default router;
