import { Router, Request, Response } from "express";
import {
  addEmployee,
  updateData,
  getList,
} from "../Controller/employeeController";
const router = Router();

router.get("/getList", getList);
router.post("/addData", addEmployee);
router.post("/updateData", updateData);

export default router;
