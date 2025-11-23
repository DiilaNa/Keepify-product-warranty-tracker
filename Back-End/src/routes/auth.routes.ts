import { Router } from "express";
import { adminRegister, handleRefreshToken, login, register } from "../controller/auth.controller";

const router = Router();

router.post("/register",register)
router.post("/login",login)
router.post("/refresh",handleRefreshToken)

router.post("/admin/register",adminRegister)


export default router;