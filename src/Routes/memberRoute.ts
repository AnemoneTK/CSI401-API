import { Router } from "express";
import { Register } from "../Controller/memberController";

const router = Router();

router.get("/register", Register);

export default router;
