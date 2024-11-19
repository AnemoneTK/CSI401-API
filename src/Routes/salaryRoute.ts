import { Router } from "express";
import { Salary } from "../Controller/salaryController";

const router = Router();

router.get("/salary", Salary);

export default router;
