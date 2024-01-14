import { Router } from "express";
import { error404 } from "../../controllers/error404.controller";

const router: Router = Router();

router.get("*", error404);
router.post("*", error404);
router.put("*", error404);
router.patch("*", error404);
router.delete("*", error404);

export default router;
