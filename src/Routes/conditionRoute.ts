import { Router } from "express";

import {
  condition,
  salaryCal,
  salaryCalSwitch,
  workshop,
} from "../Controller/conditionController";
const router = Router();

router.get("/condition", condition);
router.get("/condition/salary", salaryCal);
router.get("/condition/salaryCalSwitch", salaryCalSwitch);
router.get("/condition/workshop", workshop);

export default router;
