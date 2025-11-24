import { Router } from "express";
import { adminRegister, handleRefreshToken, login, register } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth";
import { authorizeRoles } from "../middleware/roles";
import { Role } from "../model/User";

const router = Router();

// public enpoints
router.post("/register",register)
router.post("/login",login)
router.post("/refresh",handleRefreshToken)

// protected as admin only
router.post("/admin/register",authenticate,authorizeRoles([Role.ADMIN]),adminRegister)


export default router;