import { Router } from "express";
import { SignIn } from "../Controller/authController";

const router = Router();

router.post("/signin", SignIn);

export default router;
