import { Router } from "express";
import { register, login, logout } from "../../../network/controllers/auth.controller";

const router: Router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

export default router;
