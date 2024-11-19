import { Router } from "express";
import { createUser, getUsers } from "../Controller/userController";
const router = Router();

router.post("/create_user", createUser);
router.get("/get_users", getUsers);

export default router;
