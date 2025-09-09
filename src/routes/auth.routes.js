import { Router } from "express";

import {
    registerFounder,
    registerAdmin,
    loginFounder,
    loginAdmin,
    refreshToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register-founder", registerFounder);
router.post("/register-admin", registerAdmin);
router.post("/login-founder", loginFounder);
router.post("/login-admin", loginAdmin);
router.post("/refresh", refreshToken);

export default router;