import { Router } from "express";
import { calNum } from "../Controller/calNumController";

const router = Router();

router.get("/calculate", calNum);

export default router;
